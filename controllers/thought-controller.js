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
  },
  // Update a Single Thought by ID
  updateThought: (req, res) => {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
      .then(dbThoughtData => {
        !dbThoughtData ? res.status(404).json({ message: `No thought found for id:${req.params.thoughtId}` })
          : res.json(dbThoughtData)
      })
      .catch(err => {
        console.error(err)
        res.status(500).json(err)
      })
  },
  // Delete a Single Thought by ID
  deleteThought: (req, res) => {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: `No thought found with id:${req.params.thoughtId}` })
        }

        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        )
      })
      .then(dbUserData => {
        !dbUserData ? res.status(404).json({ message: `Thought created but no user with this id` })
          : res.json({ message: 'Thought successfully deleted!' })
      })
      .catch(err => {
        console.error(err)
        res.status(500).json(err)
      })
  },
  // Add a Reaction to a Thought
  addReaction: (req, res) => {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then(dbThoughtData => {
        !dbThoughtData ? res.status(404).json({ message: `No thought found with id:${req.params.thoughtId}` })
          : res.status(201).json(dbThoughtData)
      })
      .catch(err => {
        console.error(err)
        res.status(500).json(err)
      })
  },
  // Remove a reaction from a Thought
  removeReaction: (req, res) => {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then(dbThoughtData => {
        !dbThoughtData ? res.status(404).json({ message: `No thought found with id:${req.params.thoughtId}` })
          : res.json({ message: 'Reaction successfully removed!' })
      })
      .catch(err => {
        console.error(err)
        res.status(500).json(err)
      })
  }
}


module.exports = thoughtController