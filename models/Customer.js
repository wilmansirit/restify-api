'use strict'

const   mongoose    = require('mongoose')
    ,   timestamps  = require('mongoose-timestamp')
    ,   soft_delete = require('mongoose-softdelete');

const CustomerSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true
    },

    balance: {
        type: Number,
        default: 0
    }
});

// Pasarle timestamp al esquema
CustomerSchema.plugin(timestamps);
CustomerSchema.plugin(soft_delete);

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;