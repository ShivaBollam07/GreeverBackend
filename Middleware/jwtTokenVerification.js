const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const jwtTokenVerification = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1] || req.body.token;
    if (!token) {
        res.status(401).json({ error: 'Unauthorized Not logged in' });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWTSecret);
        req.user = decoded;
        // req.email = decoded.email;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ error: 'Unauthorized Token expired' });
            return;
        }
        res.status(401).json({ error: 'Unauthorized Invalid token' });
    }
};

module.exports = jwtTokenVerification;
