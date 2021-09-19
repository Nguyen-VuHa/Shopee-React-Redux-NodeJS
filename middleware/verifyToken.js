const jwt = require('jsonwebtoken');

function verifyToken (req, res, next) {
    const bearberHeader = req.headers.authorization;
    const token = bearberHeader && bearberHeader.split(' ')[1];
    
    if(!token) return res.sendStatus(401);
    
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        req.userId = decoded.user.id;
        next();
    }
    catch(err) {
        console.log(err);
        return res.sendStatus(403);
    }
}

module.exports = verifyToken;


