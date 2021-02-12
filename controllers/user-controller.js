const { User } = require('../models')

const userController = {
  getUsers: (req, res) => {
    User.find()
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  },
  createUser: (req, res) => {
    User.create(req.body)
      .then(dbUserData => res.status(201).json(dbUserData))
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  }
}

module.exports = userController