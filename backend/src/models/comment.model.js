const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const commentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    post: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Post',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
commentSchema.plugin(toJSON);

/**
 * @typedef Token
 */
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
