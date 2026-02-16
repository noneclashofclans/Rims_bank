const user = require('../models/User.js');
const jwt = require ('jsonwebtoken');
const blacklist = require('../models/blacklist.js');



const authentication_middleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1 ];

    // if no token, no auth
    if (!token){
        return res.status(401).json({
            message: 'Token not found'
        })
    }

    // checking blacklisted state
    const isUserblacklisted = await blacklist.findOne( {token} );

    if (isUserblacklisted){
        return res.status(401).json({
            message: 'Blacklisted user'
        })
    }


    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        const validUser = await user.findById(decoded.userId);

        req.user = validUser;
        
        return next();
    }
    catch(err){
        return res.status(401).json({
            message: "Unauthorized access, token is invalid"
        })
    }
}   



const authentication_system_user_middleware = async(req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1 ];

    // if no token, no auth
    if (!token){
        return res.status(401).json({
            message: 'Token not found'
        })
    }

    const isUserblacklisted = await blacklist.findOne( {token} );

    if (isUserblacklisted){
        return res.status(401).json({
            message: 'Blacklisted user'
        })
    }

     try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        const validUser = await userModel.findById(decoded.userId).select("+systemUser")
        if (!validUser.systemUser) {
            return res.status(403).json({
                message: "Forbidden access, not a system user"
            })
        }

        req.user = user

        return next()
    }
    catch (err) {
        return res.status(401).json({
            message: "Unauthorized access, token is invalid"
        })
    }

}



module.exports = {
    authentication_middleware,
    authentication_system_user_middleware
}