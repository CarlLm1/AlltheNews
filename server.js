var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// scraping tools

var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");