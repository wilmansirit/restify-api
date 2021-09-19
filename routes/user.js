"use strict"


const userController = require('../controllers/User')

module.exports = server => {

    // //Get Users
    server.get('/users', userController.getAll)

    //Post User
    server.post('/register', userController.addNew);

    // Auth User
    server.post('/auth', userController.auth);
}