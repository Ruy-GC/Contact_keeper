const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next){
    //Get token from header
    const token = req.header('x-auth-token');

    //Check if not token
    if(!token) {
        //check if teken exist in the header
        return res.status(401).json({msg: 'No token, authorization denied'});
    }

    try {
        //gets payload with user id from token
        const decoded = jwt.verify(token,config.get('jwtSecret'));
        //gets user from the payload to have access to it from the route
        req.user = decoded.user;
        next();

    } catch (error) {
        res.status(401).json({msg:'Token is not valid'});
    }
}