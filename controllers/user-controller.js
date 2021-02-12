const { User } = require('../models')

const userController = {
  // Create a new user
  createUser: (req, res) => {
    User.create(req.body)
      .then(dbUserData => res.status(201).json(dbUserData))
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  },
  // Get all users
  getUsers: (req, res) => {
    User.find()
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  },
  // Get single user by id
  getSingleUser: (req, res) => {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
      .then(dbUserData => {
        !dbUserData ? res.status(404).res.json({ message: `No user exists with id:${req.params.userId}` })
          : res.json(dbUserData)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  },
  updateUser: (req, res) => {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      {
        runValidators: true,
        new: true
      }
    )
      .then(dbUserData => {
        !dbUserData ? res.status(404).json({ message: `No user exists with id:${req.params.userId}` })
          : res.json(dbUserData)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  },
  deleteUser: (req, res) => {
    User.findOneAndDelete({ _id: req.params.userId })
      .then(dbUserData => {
        !dbUserData ? res.status(404).json({ message: `No user exists with id:${req.params.userId}` })
          : res.json(dbUserData)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  }

}

module.exports = userController