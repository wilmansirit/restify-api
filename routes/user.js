"use strict"

const controllers = require('../controllers')


module.exports = server => {

    //Get Users
    server.get('/users', controllers.User.get)

    //Post User
    server.post('/register', controllers.User.addNew);

    // Auth User
    server.post('/auth', controllers.User.auth);
}