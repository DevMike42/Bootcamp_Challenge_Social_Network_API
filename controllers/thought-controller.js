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
  }
}


module.exports = thoughtController