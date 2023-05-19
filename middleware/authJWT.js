const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.API_SECRET, (user, err) => {
            if (err) return res.status(401).send('Not Authorized');
            req.user = user;
            next();
        });
    } else {
        res.status(401).send('Not authorized');
    }
};

module.exports = verifyToken;
