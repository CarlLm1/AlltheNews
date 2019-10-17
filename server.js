// Dependencies
var body = require("body-parser");
var express = require("express");
var exphdbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");
var req = require("request");

// scraping tools

var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");
