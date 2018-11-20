const Comment = require('../models/Comment');
const { queryByFilter } = require('./handleQuery')

async function getComments (req, res, next) {
  const { count, results } = await queryByFilter(Comment, req, {
    episode_id: req.params.id,
  });

  console.log({ count, results });

  req.payload = {
    ...req.payload,
    count,
    results
  }

  next();
}

function postComment (req, res) {
  Comment.create({
    ...req.body,
    episode_id: req.params.id,
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
}

module.exports = {
  getComments,
  postComment,
}
