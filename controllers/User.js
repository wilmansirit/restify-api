'use strict'


const errors = require('restify-errors')
    , bycript = require('bcryptjs')
    , jwt = require('jsonwebtoken')
    , User = require('../models/User')


module.exports = {

    getAll: async (req, res, next) => {

        const users = await User.find();

        try {

            res.send(users);
            res.send(200)
            next();

        } catch (err) {

            return next(new errors.InternalError(err.message));

        }
    },

    addNew: async (req, res, next) => {

        // Check for json
        if (!req.is('application/json')) return next(new errors.InvalidHeaderError("Expects 'applications/json'"));

        try {

            let { email, password } = req.body

            const salt = await bycript.genSalt(10);
            password = await bycript.hash(password, salt);

            const newUser = new User({ email, password });

            newUser.save();

            res.send(201);
            next();

        } catch (err) {

            return next(new errors.InternalError(err.message));

        }

    }

}