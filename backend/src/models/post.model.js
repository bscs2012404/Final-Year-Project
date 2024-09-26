const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    sharedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],

  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
postSchema.plugin(toJSON);

/**
 * @typedef Token
 */
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
