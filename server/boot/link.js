var Hashids = require('hashids'),
  hasher = new Hashids('238628', 4);

module.exports = function (app) {
  var linkModel = app.models.link;

  app.get('/link', function (req, res) {
    var url = req.query.url;

    if (url) {
      url = decodeURIComponent(url);
      linkModel.create({
        url: url,
        proxy: !!req.query.proxy
      }).then(function (obj) {
        res.send(hasher.encode(obj.toJSON().id));
      });
    } else {
      res.sendStatus(404);
    }
  });
};
