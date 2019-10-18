// Scrape tools 'request' and 'cheerio':
var request = require("request");
var cheerio = require("cheerio");

var scrape = function(cb) {
  request("https://www.snopes.com/news/", function(err, res, body) {
    var $ = cheerio.load(body);
    var articles = [];
    $(".media-wrapper").each(function(i, element) {
      var head = $(this)
        .children(".title")
        .text()
        .trim();
      var sum = $(this)
        .children(".subtitle")
        .text()
        .trim();

      if (head && sum) {
        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        var dataToAdd = {
          headline: headNeat,
          summary: sumNeat
        };
        articles.push(dataToAdd);
      }
    });
    cb(articles);
  });
};

module.exports = scrape;
