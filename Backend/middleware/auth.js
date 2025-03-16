const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    // console.log(req.headers);
    const authHeader = req.headers['authorization'];
    if(!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({message:"Authorization header is missing or invalid"});
    // console.log(authHeader);

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Token not found" });
    }

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.status(401).json({message:"Invalid token"});
            req.user = decoded;
            next();
        }
    )
}

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden: Insufficient privileges" });
        }
        next();
    };
};

module.exports = { verifyJWT, authorizeRoles };