module.exports = function(router) {
  // Route for rendering the homepage
  router.get("/", function(req, res) {
    res.render("home");
  });
  //Route for rendering the Saved page
  router.get("/saved", function(req, res) {
    res.render("saved");
  });
};
