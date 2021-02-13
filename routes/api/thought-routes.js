const router = require('express').Router()

const {
  createThought,
  getThoughts
} = require('../../controllers/thought-controller')

// /api/thoughts
router.route('/')
  .post(createThought)
  .get(getThoughts)

module.exports = router