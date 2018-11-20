const express = require('express')
const { sanitizeQuery } = require('express-validator/filter')

const operations = require('../controllers/handleOperations')
const episode = require('../controllers/episode')
const comments = require('../controllers/comments')
const { pagination, checkArray, showData, checkData } = require('./middlewares')
const { catchErrors } = require('../handlers/errors')
const { site, collection } = require('../utils/helpers')

const router = express.Router()
const sanitize = model => sanitizeQuery(collection.queries[model]).trim()

const hooks = {
  find: [pagination, catchErrors(operations.getAll), checkData, showData],
  findById: [checkArray, catchErrors(operations.getById)],
  findComments: [pagination, catchErrors(episode.getComments), checkData, showData],
}

router.get('/', (req, res) => {
  res.json({
    characters: `${site}/character`,
    locations: `${site}/location`,
    episodes: `${site}/episode`
  })
})

router.get('/character/avatar', (req, res) => res.redirect('/api/character'))

router.get('/character', sanitize("character"), hooks.find)
router.get('/character/:id', hooks.findById)

router.get('/location', sanitize("location"), hooks.find)
router.get('/location/:id', hooks.findById)

router.get('/episode', sanitize("episode"), hooks.find)
router.get('/episode/:id', hooks.findById)

router.get('/episode/:id/comments', hooks.findComments)
router.post('/episode/:id/comments', episode.postComment)

router.post('/comments', comments.create);

module.exports = router
