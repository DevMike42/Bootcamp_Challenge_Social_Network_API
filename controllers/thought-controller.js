const { Thought, User } = require('../models')


const thoughtController = {
  // Create Thought
  createThought: (req, res) => {
    Thought.create(req.body)
      .then(dbThoughtData => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        )
      })
      .then(dbUserData => {
        !dbUserData ? res.status(404).json({ message: `Thought created but no user exists with id:${req.body.userId}` })
          : res.status(201).json({ message: 'Thought created successfully!' })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  },
  // Get All thoughts
  getThoughts: (req, res) => {
    Thought.find()
      .sort({ createdAt: -1 })
      .then(dbThoughData => res.json(dbThoughData))
      .catch(err => {
        console.error(err)
        res.status(500).json(err)
      })
  },
  // Get a Single Thought by ID
  getSingleThought: (req, res) => {
    Thought.findOne({ _id: req.params.thoughtId })
      .then(dbThoughtData => {
        !dbThoughtData ? res.status(404).json({ message: `No thought found for id:${req.params.thoughtId}` })
          : res.json(dbThoughtData)
      })
      .catch(err => {
        console.error(err)
        res.status(500).json(err)
      })
  }
}


module.exports = thoughtController