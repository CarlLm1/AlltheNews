// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var exphdbs = require("express-handlebars");
var mongoose = require("mongoose");

// Setup host to be on designated port 3000
var PORT = process.env.PORT || 3000;

var app = express();

// Setup Express Router
var router = express.Router();

// The public folder will be the static directory
app.use(express.static(__dirname + "/public"));

// Handlebars
app.engine(
  "handlebars",
  exphdbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

//bodyParser
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// Have requests go thru the router middleware
app.use(router);

// using the deployed database.
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoAlltheNews";

// Connect mongoose to the database
mongoose.connect(db, function(error) {
  // Log any errors or log a success message
  if (error) {
    console.log(error);
  } else {
    console.log("Mongoose connection successful!");
  }
});

// Listen on the port
app.listen(PORT, function() {
  console.log("Listening on port:" + PORT);
});

// var logger = require("morgan");

// var req = require("request");

// // scraping tools

// var axios = require("axios");
// var cheerio = require("cheerio");

// // Require all models
// var db = require("./models");
