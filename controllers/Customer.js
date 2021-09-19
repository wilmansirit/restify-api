const errors = require('restify-errors')
    , Customer = require('../models/Customer')


/**
 * 
 * 
 */


module.exports = {

    getAll: async (req, res, next) => {

        try {

            const customers = await Customer.find();
            res.send(customers);
            next();

        } catch (error) {

            return next(new errors.InvalidContentError(err));

        };
    },

    getById: async (req, res, next) => {

        try {

            const customer = await Customer.findById(req.params.id)
            res.send(customer);
            next();

        } catch (err) {
            return next(new errors.ResourceNotFoundError(`Ther is no Customer with the id: ${req.params.id}`));
        };

    },

    addNew: async (req, res, next) => {

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

    },

    modify: async (req, res, next) => {

        // Check for json
        if (!req.is('application/json')) return next(new errors.InvalidContentError("Expects 'application/json'"));

        try {

            await Customer.findByIdAndUpdate({ _id: req.params.id }, req.body);
            res.send(200)
            next();


        } catch (err) {
            return next(new errors.ResourceNotFoundError(`There is no customer with the id: ${req.params.id}`));
        };
    },

    delete: async (req, res, next) => {

        try {

            const response = await Customer.findByIdAndRemove({ _id: req.params.id });
            res.send(response);
            res.send(204);
            next();

        } catch (err) {
            return next(new errors.ResourceNotFoundError(`There is no customer with the id: ${req.params.id}`));
        }

    }

}