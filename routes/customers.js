'use strict'

const errors = require('restify-errors')
    , rjwt = require('restify-jwt-community')
    , Customer = require('../models/Customer')
    , config = require('../config')


const controllers = require('../controllers');


module.exports = server => {
    // Get Customers

    server.get('/customers', controllers.Customer.getAll);

    // Get a single customer
    server.get('/customers/:id', controllers.Customer.getById);

    //Add Customers
    server.post('/customers', rjwt({ secret: config.JWT_SECRET }), controllers.Customer.addNew);
    // server.post('/customers', controllers.Customer.addNew);

    // Modify User
    server.put('/customers/:id', rjwt({ secret: config.JWT_SECRET }), controllers.Customer.modify);

    // Delete Customer
    server.del('/customers/:id', rjwt({ secret: config.JWT_SECRET }), controllers.Customer.delete);
}