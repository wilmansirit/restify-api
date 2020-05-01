"use strict"

const   mongoose    = require('mongoose')
    ,   timestamps  = require('mongoose-timestamp');


const  UserSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        trim: true
    }
})

// Pasarle timestamp al esquema
UserSchema.plugin(timestamps);

const User = mongoose.model('User', UserSchema);
module.exports = User;

