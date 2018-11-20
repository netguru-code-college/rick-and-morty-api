const Comment = require('../models/Comment');

function create (req, res, next) {
  Comment.create(req.body)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
}

module.exports = {
  create,
}
