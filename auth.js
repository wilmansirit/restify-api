"use strict"

const bcrypt = require('bcryptjs')
    , mongoose = require('mongoose')
    , errors = require('restify-errors')
    , User = mongoose.model('User')


exports.authenticate = async (email, password) => {

    try {
        // Get User by email
        const user = await User.findOne({ email });
        // User no exist
        if (!user) throw "Incorrect email/password combination";

        // Match password
        const isMatch = await bcrypt.compare(password, user.password)

        // Password not match
        if (!isMatch) throw "Incorrect email/password combination";

        return user

    } catch (err) {
        // Return errors
        return new errors.UnauthorizedError(err);

    }

}
