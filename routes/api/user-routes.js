const router = require('express').Router()

// /api/users
router.route('/').get((req, res) => {
  res.send('Working')
})


module.exports = router
