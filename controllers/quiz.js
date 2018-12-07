function postAnswers (req, res) {
  return res.json({
    name: 'You\'re one and only.',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg'
  })
}

module.exports = {
  postAnswers,
}
