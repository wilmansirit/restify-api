"use strict"

const { auth } = require('./controllers/User');

const bcrypt = require('bcryptjs')
    , mongoose = require('mongoose')
    , errors = require('restify-errors')
    , User = mongoose.model('User')
    , config = require('./config')


const authenticate = async (email, password) => {

    try {
        // Get User by email
        const user = await User.findOne({ email });
        // User no exist
        if (!user) throw "Incorrect email/password combination";

        // Match password
        const isMatch = await bcrypt.compare(password, user.password)

        
        // Password not match
        if (!isMatch) throw "Incorrect email/password combination";
        
        db.close()

        return user

    } catch (err) {
        // Return errors
        return new errors.UnauthorizedError(err);
    }

}

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };
  
  mongoose.connect(config.MONGODB_URI, options);
  
  // Connecting to the DDBB...
  const db = mongoose.connection;
  

authenticate("wsirit@gmail.com", "12345")
    .then(data => console.log(data))
    .catch(err => console.log(err))
