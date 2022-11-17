const { Comment, thought } = require('../models/thought');

const commentController = {
  // add comment to thought
  addComment({ params, body }, res) {
    console.log(params);
    Comment.create(body)
      .then(({ _id }) => {
        return thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { comments: _id } },
          { new: true }
        );
      })
      .then(dbthoughtData => {
        console.log(dbthoughtData);
        if (!dbthoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbthoughtData);
      })
      .catch(err => res.json(err));
  },

  // add reply to comment
  addReply({ params, body }, res) {
    Comment.findOneAndUpdate(
      { _id: params.commentId },
      { $push: { replies: body } },
      { new: true, runValidators: true }
    )
      .then(dbthoughtData => {
        if (!dbthoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbthoughtData);
      })
      .catch(err => res.json(err));
  },

  // remove comment
  removeComment({ params }, res) {
    Comment.findOneAndDelete({ _id: params.commentId })
      .then(deletedComment => {
        if (!deletedComment) {
          return res.status(404).json({ message: 'No comment with this id!' });
        }
        return thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { comments: params.commentId } },
          { new: true }
        );
      })
      .then(dbthoughtData => {
        if (!dbthoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbthoughtData);
      })
      .catch(err => res.json(err));
  },
  // remove reply
  removeReply({ params }, res) {
    Comment.findOneAndUpdate(
      { _id: params.commentId },
      { $pull: { replies: { replyId: params.replyId } } },
      { new: true }
    )
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  }
};

module.exports = commentController;
