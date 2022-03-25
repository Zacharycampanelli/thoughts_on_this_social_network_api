const router = require('express').Router();

// /api/user
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend,
} = require('../../controllers/user-controller');

const {
  getAllThoughts,
  getThoughtsById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thought-controller');

//  /api/user
router
    .route('/user')
    .get(getAllUsers)
    .post(createUser);

//  /api/user/:id
router
    .route('/user/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

//  /api/users/:userId/friends/:friendId
    route('users/:userId/friends/:friendId')
    .post(createFriend)
    .delete(deleteFriend);

//  /api/thought
router
    .route('/thought')
    .get(getAllThoughts)
    .post(createThought);

//  /api/thought/:id
router
    .route('/thought/:id')
    .get(getThoughtsById)
    .put(updateThought)
    .delete(deleteThought);

//  /api/thoughts/:thoughtId/reactions
router
    .route('/api/thoughts/:thoughtId/reactions')
    .post(createReaction)
    .delete(deleteReaction);

module.exports = router;
