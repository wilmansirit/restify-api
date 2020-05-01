'use strict'

const restify = require('restify')
    , mongoose = require('mongoose')
    , morgan = require('morgan')
    , config = require('./config')
    , rjwt = require('restify-jwt-community');


const server = restify.createServer({ name: 'myApp', version: '1.0.0' });

// Middleware
server.use(restify.plugins.bodyParser());
server.use(morgan('tiny'));

// 1st Method: Protect All Routes except......
// server.use(rjwt({ secret: config.JWT_SECRET }).unless({ path: ['/auth'] }));

mongoose.connect(
    config.MONGODB_URI,
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    }
);

// Connecting to the DDBB...
const db = mongoose.connection;

db.on('error', (err) => console.log("*** ERROR: \n", err.message));

db.once('open', () => {

    server.listen(config.PORT, () => console.log(`Server start on port ${config.PORT}`));

    require('./routes/customers')(server);
    require('./routes/user')(server);

});