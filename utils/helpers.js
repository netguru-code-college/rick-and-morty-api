exports.site = 'http://tiny-rick.tk/api'

exports.message = {
  noPage: 'There is nothing here',
  noCharacter: 'Character not found',
  noComments: 'No comments',
  noLocation: 'Location not found',
  noEpisode: 'Episode not found',
  badParam: 'Hey! that parameter is not allowed, try with a number instead ;)',
  badArray: 'Bad... bad array :/'
}

exports.collection = {
  exclude: '-_id -author -__v -edited',
  limit: 20,
  queries: {
    character: ['name', 'status', 'species', 'type', 'gender'],
    episode: ['name', 'episode'],
    location: ['name', 'dimension', 'type'],
    comment: ['episode_id']
  }
}
