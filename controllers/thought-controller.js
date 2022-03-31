const res = require('express/lib/response');
const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  // GET /api/thought
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .populate({
        path: 'thoughtText',
        select: '-__v',
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get single thought by id
  // GET /api/thought/_id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'thoughtText',
        select: '-__v',
      })
      .select('-__v')
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // create single thought
  // POST /api/thought
  createThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { username: body.username },
          { $push: { thoughts: _id } },
          { new: true, runValidators: true }
        );
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // create single thought
  // POST /api/thought ??????
  createReaction({ body }, res) {
    Reaction.findOneAndUpdate(
      { _id: params.reactionId },
      { $push: { replies: body } },
      { new: true, runValidators: true }
    )
      .then((dbReactionData) => {
        if (!dbReactionData) {
          res.status(404).json({ message: 'No Reaction found with this id!' });
          return;
        }
        res.json(dbReactionData);
      })
      .catch((err) => res.json(err));
  },

  // update thought by id
  // PUT /api/thought/_id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete pizza by id
  // DELETE /api/pizzas/_id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete reply
  //???
  deleteReaction({ params }, res) {
    Reaction.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbReactionData) => res.json(this.deleteReaction))
      .catch((err) => res.json(err));
  },
};
module.exports = thoughtController;
