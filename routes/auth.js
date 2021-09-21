"use strict"

const authController = require('../controllers/Auth')

module.exports = server => {

    // Auth User
    server.post('/auth', authController.auth);
}