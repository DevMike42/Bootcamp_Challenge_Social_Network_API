const router = require('express').Router()

const {
  createThought
} = require('../../controllers/thought-controller')

// /api/thoughts
router.route('/')
  .post(createThought)

module.exports = router