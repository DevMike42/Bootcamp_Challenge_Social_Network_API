const router = require('express').Router()
const {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser
} = require('../../controllers/user-controller')

// /api/users
router.route('/')
  .post(createUser)
  .get(getUsers)

// /api/users/:userId
router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser)


module.exports = router
