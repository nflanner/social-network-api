const router = require('express').Router();
const {
  getThoughts,
//   getSingleThought,
  createThought,
//   updateThought,
//   deleteThought,
//   createReaction,
//   removeReaction
} = require('../../controllers/thoughtController');

// // /api/thoughts
// router.route('/').get(getThoughts).post(createThought);

// // /api/thoughts/:userId
// router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought);

// // /api/thoughts/:thoughtId/reactions
// router.route('/:thoughtId/reactions').post(createReaction).delete(removeReaction);

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

module.exports = router;
