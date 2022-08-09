const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');
const Thought = require('../models/Thought');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        !thoughts
          ? res.status(404).json({ message: 'No thoughts found' })
          : res.json(thoughts);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json({
              thought,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
// create a new user
async createThought(req, res) {
    const thoughtUserId = req.body.userId;
    Thought.create({
        thoughtText: req.body.thoughtText,
        username: req.body.username,
    })
        .then((thought) => {
            return !thought
                ? res.status(500).json(err)
                : User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id.toString() } },
                    { new: true }
                )
        })
        .then((user) =>
            !user
                ? res.status(404).json({
                    message: 'thought added, but no user found',
                  })
                : res.json(user)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
},
// Delete a thoght
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
      !thought
          ? res.status(404).json({ message: 'No such thought exists' })
          : res.json({ message: 'Thought successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Update a thought by id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      req.body,
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res
            .status(404)
            .json({ message: 'No thought found with that ID :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //Creates and adds a reaction to a thought
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
//   //Removes friend from user
//   removeFriend(req, res) {
//     User.findOneAndUpdate(
//       { _id: req.params.userId },
//       { $pull: { friends: req.params.friendId } },
//       { runValidators: true, new: true }
//     )
//       .then((user) =>
//         !user
//           ? res
//               .status(404)
//               .json({ message: 'No user found with that ID :(' })
//           : res.json(user)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
};
