$(document).ready(function() {
  // All dynamic content will show up in the article-container div
  var articleContainer = $(".article-container");
  $(document).on("click", ".btn.delete", handleArticleDelete);
  $(document).on("click", ".btn.notes", handleArticlesNotes);
  $(document).on("click", ".btn.save", handleNoteSave);
  $(document).on("click", ".btn.note-delete", handleNoteDelete);
  // Once the docuemnt is ready, initPage will start
  initPage();

  function initPage() {
    // Empty the article container and run an AJAX request
    articleContainer.empty();
    $.get("/api/articles?saved=true").then(function(data) {
      // If there are headlines, they will get rendered to the page
      if (data && data.length) {
        renderArticles(data);
      } else {
        // If not, render a message saying no articles to the page
        renderEmpty();
      }
    });
  }
  function renderArticles(articles) {
    // This function will append HTML containing article data to the page
    // An array containing all availalbe articles in the database will be passed
    var articlePanels = [];
    for (var i = 0; i < articles.length; i++) {
      articlePanels.push(createPanel(articles[i]));
    }
    // Once all the HTML for the articles are stored in the articlePanels array,
    // it will be appended to the articlePanels container.
    articleContainer.append(articlePanels);
  }
  // createPanel
  function createPanel(article) {
    // This function will take in a single JSON object for an article,
    // then it constructs a jQuery element,
    // which contains all the formatted HTML for the article panel.
    var panel = $(
      [
        "<div class = 'panel panel-default'>",
        "<div class = 'panel-heading'>",
        "<h3>",
        article.article,
        "<a class='btn btn-success save'>",
        "Save Article",
        "</a>",
        "</h3>",
        "</div>",
        "<div class = 'panel-body'>",
        article.summary,
        "</div>",
        "</div>"
      ].join("")
    );
    // Then the article's id will be attached to the jQuery element
    // This will be used when trying to figure out which article the user wants to save
    panel.data("_id", article._id);
    // Return the constructed panel jQuery element
    return panel;
  }
  function renderEmpty() {
    // This is the function that renders to HTML if there are no articles to view
    var emptyAlert = $(
      [
        "<div class = 'alert alert-warning text-center'>",
        "<h4> Welp, it looks like we don't have any articles.</h4>",
        "</div>",
        "<div class = 'panel panel-default'>",
        "<div class = 'panel-heading text-center'>",
        "<h3> What do you want to do? </h3>",
        "</div>",
        "<div class = 'panel-body text-center'>",
        "<h4><a class = 'scrape-new'>Try scraping new articles</a></h4>",
        "<h4><a href='/saved'>Go to saved articles</a></h4>",
        "</div>",
        "</div>"
      ].join("")
    );
    // Appending this data to the page
    articleContainer.append(emptyAlert);
  }
  function handleArticleDelete() {
    // This function will delete articles
    var articleToDelete = $(this)
      .parents(".panel")
      .data();
    $.ajax({
      method: "DELETE",
      url: "/api/articles" + articleToDelete._id
    }).then(function(data) {
      if (data.ok) {
        initPage();
      }
    });
  }
});
