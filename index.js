"use strict";

const restify = require("restify"),
  mongoose = require("mongoose"),
  morgan = require("morgan"),
  config = require("./config"),
  rjwt = require("restify-jwt-community"),
  cors = require("cors");

const server = restify.createServer({
  name: "myApp",
  version: "1.0.0",
});

// Middleware
server.use(restify.plugins.bodyParser());
server.use(cors());
server.use(morgan("tiny"));

//
/** 
 * Methods to protect routes
 * 
 * 1st Method: Protect All Routes except...... * 
 *      server.use(rjwt({ secret: config.JWT_SECRET }).unless({ path: ['/auth'] }));
 * 
 * 
 * 2do. Method: 
 * add on routes like a middleware: 
 *      rjwt({ secret: config.JWT_SECRET }
*       Example:
 *      server.put('/customers/:id', rjwt({ secret: config.JWT_SECRET }), async (req, res, next) => {
 *      
 *          // boy of the function
 * 
*       }

 * */

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
//   user: config.MONGO_USER,
//   pass: config.MONGO_PASS,
};

mongoose.connect(config.MONGODB_URI, options);

// Connecting to the DDBB...
const db = mongoose.connection;

db.on("error", (err) => console.log("*** ERROR: \n", err.message));
// db.on('connecting', () => console.log("Connecting to database....."))

db.once("open", () => {
  server.listen(config.PORT, () =>
    console.log(`Server start on port ${config.PORT}`)
  );

  require("./routes/customers")(server);
  require("./routes/user")(server);
});
