// Require the scrape and date scripts in the scripts folder
var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");

// Require the Article model in the models folder
var Article = require("../models/Article");

module.exports = {
  fetch: function(cb) {
    scrape(function(data) {
      var articles = data;
      for (var i = 0; i < articles.length; i++) {
        articles[i].date = makeDate();
        articles[i].saved = false;
      }
      // Mongo function
      Article.collection.insertMany(articles, { ordered: false }, function(
        err,
        docs
      ) {
        cb(err, docs);
      });
    });
  },
  // Delete article
  delete: function(query, cb) {
    Article.remove(query, cb);
  },
  // Get article
  get: function(query, cb) {
    Article.find(query)
      .sort({
        _id: -1
      })
      .exec(function(err, doc) {
        cb(doc);
      });
  },
  //Update article
  update: function(query, cb) {
    Article.update(
      { _id: query._id },
      {
        $set: query
      },
      {},
      cb
    );
  }
};
