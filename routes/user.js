"use strict"

const rjwt = require('restify-jwt-community')
    , {JWT_SECRET} = require('../config')
    , userController = require('../controllers/User')

module.exports = server => {

    // //Get Users
    server.get('/users', rjwt({ secret: JWT_SECRET }), userController.getAll)


    //Post User
    server.post('/register', userController.addNew);

}