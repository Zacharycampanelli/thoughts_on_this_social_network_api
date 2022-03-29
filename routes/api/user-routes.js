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


//  /api/user
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

//  /api/user/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/:userId/friends/:friendId')
    // .post(createFriend)
    // .delete(deleteFriend);


module.exports = router;
