const router = require('express').Router()

const {
  createThought,
  getThoughts,
  getSingleThought,
  updateThought,
  deleteThought
} = require('../../controllers/thought-controller')

// /api/thoughts
router.route('/')
  .post(createThought)
  .get(getThoughts)

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought)

module.exports = router