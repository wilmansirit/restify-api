'use strict'

const errors = require('restify-errors')
    , rjwt = require('restify-jwt-community')
    , {JWT_SECRET} = require('../config')


// const controllers = require('../controllers');
const customerController = require('../controllers/Customer')


module.exports = server => {

    // Get Customers
    server.get('/customers', customerController.getAll);

    // Get a single customer
    server.get('/customers/:id', rjwt({ secret: JWT_SECRET }), customerController.getById);

    // Add Customer
    server.post('/customers', rjwt({ secret: JWT_SECRET }), customerController.addNew);

    // Modify Customer
    server.put('/customers/:id', rjwt({ secret: JWT_SECRET }), customerController.modify);
    
    // Delete Customer
    server.del('/customers/:id', rjwt({ secret: JWT_SECRET }), customerController.delete);


}