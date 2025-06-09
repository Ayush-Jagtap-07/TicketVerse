const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt');
const passport = require('passport');

module.exports.signupUser = async (req, res) => {
    try {
        const { username, email, password, contactNumber } = req.body;
        const newUser = new User({ email, username, contactNumber });

        const registeredUser = await User.register(newUser, password);

        // Generate tokens
        const accessToken = generateAccessToken(registeredUser);
        const refreshToken = generateRefreshToken(registeredUser);

        // Save refresh token in the database
        // registeredUser.refreshToken = refreshToken;
        // await registeredUser.save();

        console.log('Registered user :');
        console.log(registeredUser);

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            // sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        res.cookie('token', accessToken, { maxAge: 15 * 60 * 1000 })
        res.status(200).json({ message: 'User registered successfully', accessToken });
    } catch (error) {
        res.status(500).json({ message: 'Signup error', error: error.message });
    }
}

module.exports.loginUser = (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ message: info.message });
        try {
            // Generate tokens
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            // Set refresh token in an HTTP-only cookie
            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });
            res.cookie('token', accessToken, { maxAge: 1 * 60 * 1000 })

            // Send access token to the client
            res.status(200).json({
                message: 'Login successful',
                accessToken,
            });
        } catch (saveError) {
            console.error('Error saving refresh token:', saveError);
            res.status(500).json({ message: 'Internal server error. Please try again later.' });
        }

    })(req, res, next); // Pass `req`, `res`, and `next` explicitly to `passport.authenticate`
}

module.exports.getRefreshToken = async (req, res) => {
    const refreshToken = req.cookies?.jwt; // Access token from cookie
    // console.log(refreshToken);
    if (!refreshToken) return res.status(401).json({ message: 'Refresh token required' });
    try {

        // Verify the refresh token
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Invalid refresh token' });
            console.log("Data from refresh token :", decoded);
            // Generate new access token
            const accessToken = generateAccessToken(decoded);
            // console.log(`Refresh route access token : ${accessToken}`);
            res.json({ accessToken });
            // res.cookie('token', accessToken, {maxAge: 1 * 60 * 1000})
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

module.exports.logoutUser = async (req, res) => {
    // const { userId } = req.body;

    try {
        // console.log(req.cookies)
        const refreshToken = req.cookies?.jwt; // Get refresh token from cookie
        if (!refreshToken) return res.status(401).json({ message: 'Refresh token required' });

        res.clearCookie("token");
        res.clearCookie("jwt", { httpOnly: true });

        res.json({ message: 'Logout successful' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'username email role');
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Server error while fetching users' });
    }
};

module.exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ message: 'Server error while deleting user' });
    }
};