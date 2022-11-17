const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const usernameSchema = new Schema(
  {
    usernameName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true
    },
    thoughts: {
      
    },
    friends: {

    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// get total count of comments and replies on retrieval
UsernameSchema.virtual('commentCount').get(function() {
  return this.comments.reduce(
    (total, comment) => total + comment.replies.length + 1,
    0
  );
});

const Username = model('Username', usernameSchema);

module.exports = Username;
