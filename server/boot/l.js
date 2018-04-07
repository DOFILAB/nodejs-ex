var Hashids = require('hashids'),
  request = require('request'),
  hasher = new Hashids('238628', 4);

module.exports = function (app) {
  var linkModel = app.models.link;

  app.get('/l/:hashId', function (req, res) {
    var id = hasher.decode(req.params.hashId);

    if (id && id[0]) {
      linkModel.findById(id[0]).then(function (link) {
        if (link) {
          link.updateAttributes({
            accessTimes: link.accessTimes + 1,
            lastAccess: Date.now()
          }).then(function () {
            link = link.toJSON();
            if (link.proxy) {
              var x = request(link.url);
              req.pipe(x);
              x.pipe(res);
            } else {
              res.redirect(link.url);
            }
          });
        } else {
          res.sendStatus(404);
        }
      });
    } else {
      res.sendStatus(404);
    }
  });
};
