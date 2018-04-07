var Hashids = require('hashids'),
  hasher = new Hashids('238628', 4);

module.exports = function (app) {
  var linkModel = app.models.link;

  app.get('/st/:hashId', function (req, res) {
    var id = hasher.decode(req.params.hashId);

    if (id && id[0]) {
      linkModel.findById(id[0]).then(function (link) {
        if (link) {
          res.json(link.toJSON());
        } else {
          res.sendStatus(404);
        }
      });
    } else {
      res.sendStatus(404);
    }
  });
};
