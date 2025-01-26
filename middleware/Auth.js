const jwt = require('jsonwebtoken');

// Middleware for Role-Based Access Control
const authorize = (roles) => (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });
        
        if (!roles.includes(decoded.role)) return res.status(403).json({ message: 'Access denied' });
        
        req.user = decoded;
        next();
    });
};

module.exports=authorize;