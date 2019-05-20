const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    var token = req.headers.authorization;
    if (token == null) {
        res.status(300).json({"msn": "Error. No tienes acceso"});
        return;
    }
    jwt.verify(token, process.env.JWT_KEY ||  "password", (err,auth)=>{
        if (err) {
            res.status(300).json({"msn": "Token Invalido"});
            return;
        }
        next();
    });
};
