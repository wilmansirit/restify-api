"use strict"

const bcrypt = require('bcryptjs')
    , mongoose = require('mongoose')
    , errors = require('restify-errors')
    , User = mongoose.model('User')
    , jwt = require('jsonwebtoken')
    , { JWT_SECRET } = require('../config');



module.exports = {


    auth: async (req, res, next) => {
        
        if (!req.is('application/json')) return next(new errors.InvalidHeaderError("Expects 'application/json'"));

        const { email, password } = req.body;

        try {
            // Authenticate User

            // Get User by email
            const user = await User.findOne({ email });
            // User no exist
            if (!user) throw "Incorrect email/password combination";
            
            // Match password
            const isMatch = await bcrypt.compare(password, user.password)
            
            // Password not match
            if (!isMatch) throw "Incorrect email/password combination";
            
            // Create a token
            const token = jwt.sign(user.toJSON(), JWT_SECRET, {
                expiresIn: '15m'
            })
            
            const { iat, exp } = jwt.decode(token);

            //Response with token
            res.send({ iat, exp, token });
            
            
            next();
            
        } catch (err) {
            // User unauthorized
            return next(new errors.UnauthorizedError(err));
        }
    
    }

}