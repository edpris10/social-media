const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
      thoughtName: {
        type: String,
        required: true,
      },
      createdBy: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        getter: true
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
  thoughtSchema.virtual('commentCount').get(function() {
    return this.comments.reduce(
      (total, comment) => total + comment.replies.length + 1,
      0
    );
  });
  
  const thought = model('thought', thoughtSchema);
  
  module.exports = thought;
  
