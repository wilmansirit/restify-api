'use strict'

const errors = require('restify-errors')
    , rjwt = require('restify-jwt-community')
    , Customer = require('../models/Customer')
    , config = require('../config');


module.exports = server => {
    // Get Customers
    server.get('/customers', async (req, res, next) => {

        // Check for json
        if (!req.is('application/json')) return next(new errors.InvalidHeaderError("Expects 'applications/json'"));

        try {

            const customers = await Customer.find();
            res.send(customers);
            next();

        } catch (error) {

            return next(new errors.InvalidContentError(err));

        };
    });

    // Get a single customer
    server.get('/customers/:id', async (req, res, next) => {

        // Check for json
        if (!req.is('application/json')) return next(new errors.InvalidHeaderError("Expects 'applications/json'"));

        try {

            const customer = await Customer.findById(req.params.id)
            res.send(customer);
            next();

        } catch (err) {
            return next(new errors.ResourceNotFoundError(`Ther is no Customer with the id: ${req.params.id}`));
        };

    });

    //Add Customers
    server.post('/customers', rjwt({ secret: config.JWT_SECRET }), async (req, res, next) => {

        // Check for json
        if (!req.is('application/json')) return next(new errors.InvalidHeaderError("Expects 'applications/json'"));

        const { name, email, balance } = req.body
        const customer = new Customer({ name, email, balance });

        try {

            await customer.save();
            res.send(201);
            next();

        } catch (err) {
            return next(new errors.InternalError(err.message));
        }


    });

    // Modify User
    server.put('/customers/:id', rjwt({ secret: config.JWT_SECRET }), async (req, res, next) => {

        // Check for json
        if (!req.is('application/json')) return next(new errors.InvalidContentError("Expects 'application/json'"));

        try {

            await Customer.findByIdAndUpdate({ _id: req.params.id }, req.body);
            res.send(200)
            next();


        } catch (err) {
            return next(new errors.ResourceNotFoundError(`There is no customer with the id: ${req.params.id}`));
        };
    });

    // Delete Customer
    server.del('/customers/:id', rjwt({ secret: config.JWT_SECRET }), async (req, res, next) => {

        // Check for json
        if (!req.is('application/json')) return next(new errors.InvalidContentError("Expects 'application/json'"));

        try {

            const response = await Customer.findByIdAndRemove({ _id: req.params.id });
            res.send(response);
            res.send(204);
            next();

        } catch (err) {
            return next(new errors.ResourceNotFoundError(`There is no customer with the id: ${req.params.id}`));
        }

    });
}