const mongoose = require('mongoose')
const mongodbErrorHandler = require('mongoose-mongodb-errors')

const { collection } = require('../utils/helpers')

const commentSchema = new mongoose.Schema({
  author: {
    type: String,
    default: 'Guest'
  },
  content: {
    type: String,
    required: true
  },
  episode_id: {
    type: Number,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
})

commentSchema.statics.structure = ch => {
  const m = ({ _id, author, content, episode_id, created }) => ({
    id: _id,
    author,
    content,
    episode_id,
    created
  })

  return Array.isArray(ch) ? ch.map(ch => m(ch)) : m(ch)
}

commentSchema.statics.findAndCount = async function({ skip, episode_id }) {
  if (!episode_id) {
    throw new Error('episode_id is required')
  }

  const query = { episode_id }

  const [data, count] = await Promise.all([
    this.find(query)
      .sort({ created: -1 })
      .select('-__v')
      .limit(collection.limit)
      .skip(skip),
    this.find(query).countDocuments()
  ])

  const results = this.structure(data)

  return { results, count }
}

commentSchema.plugin(mongodbErrorHandler)

module.exports = mongoose.model('Comment', commentSchema)
