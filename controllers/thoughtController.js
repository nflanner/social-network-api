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
//   // Get a single user
//   getSingleUser(req, res) {
//     User.findOne({ _id: req.params.userId })
//       .select('-__v')
//       .then(async (user) =>
//         !user
//           ? res.status(404).json({ message: 'No user with that ID' })
//           : res.json({
//               user,
//             })
//       )
//       .catch((err) => {
//         console.log(err);
//         return res.status(500).json(err);
//       });
//   },
// create a new user
createThought(req, res) {
    Thought.create({
        thoughtText: req.body.thoughtText,
        username: req.body.username,
    })
    //   .then((thought) => res.json(thought))
        .then((thought => {
            User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { thoughts: thought } },
                { runValidators: true, new: true }
            )
        }))
        .then((user) =>
            !user
                ? res
                    .status(404)
                    .json({ message: 'No user found with that ID :(' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));

    // User.findOneAndUpdate(
    //     { _id: req.params.userId },
    //     { $addToSet: { thoughts: thought } },
    //     { runValidators: true, new: true }
    // )
    // .then((user) =>
    //     !user
    //         ? res
    //             .status(404)
    //             .json({ message: 'No user found with that ID :(' })
    //         : res.json(user)
    // )
    // .catch((err) => res.status(500).json(err));
},
//   // Delete a user
//   deleteUser(req, res) {
//     User.findOneAndRemove({ _id: req.params.userId })
//       .then((user) =>
//         !user
//           ? res.status(404).json({ message: 'No such user exists' })
//           : res.json({ message: 'User successfully deleted' })
//       )
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   },

//   // Update a user by id
//   updateUser(req, res) {
//     User.findOneAndUpdate(
//       { _id: req.params.userId },
//       req.body,
//       { new: true }
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
//   //Creates and adds friend to user
//   createFriend(req, res) {
//     User.findOneAndUpdate(
//       { _id: req.params.userId },
//       { $addToSet: { friends: req.params.friendId } },
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