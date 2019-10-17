// Dependencies
var express = require("express");

// Setup host to be on designated port 3000
var PORT = process.env.PORT || 3000;

var app = express();

// Setup Express Router
var router = express.Router();

// The public folder will be the static directory
app.use(express.static(__dirname + "/public"));

// Have requests go thru the router middleware
app.use(router);

// Listen on the port
app.listen(PORT, function() {
  console.log("Listening on port:" + PORT);
});

// var body = require("body-parser");

// var exphdbs = require("express-handlebars");
// var logger = require("morgan");
// var mongoose = require("mongoose");
// var req = require("request");

// // scraping tools

// var axios = require("axios");
// var cheerio = require("cheerio");

// // Require all models
// var db = require("./models");
