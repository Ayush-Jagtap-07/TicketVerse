const jwt = require('jsonwebtoken');

// Generate Access Token
const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1m' }
    );
};

// Generate Refresh Token (Server-side only)
const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );
};

module.exports = { generateAccessToken, generateRefreshToken };