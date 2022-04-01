const res = require('express/lib/response');
const { User } = require('../models');

const userController = {
  // get all users
  // GET /api/user
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get single user by id
  // GET /api/user/:id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v')
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user with this ID' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // create single user
  // POST /api/user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  // create a friend using another user id
  // POST user/:userId/friends/:friendsId
  createFriend({ params }, res) {
    User.findOneAndUpdate({ _id: params.userId }, 
      { $addToSet: { friends: params.friendsId } }, 
      { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user with this ID' });
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // update user by id
  // PUT /api/user/:id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete user by id
  // DELETE /api/user/:id
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete friend by id
  // DELETE /api/user/:userId/friends/:friendsId
  deleteFriend({ params }, res) {
    User.findOneAndUpdate({ _id: params.userId }, { $pull: { friends: params.friendsId } })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
};
module.exports = userController;
