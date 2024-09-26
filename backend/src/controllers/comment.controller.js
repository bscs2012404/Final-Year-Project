const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { Post, Comment } = require('../models');
const mongoose = require('mongoose');

const createComment = catchAsync(async (req, res) => {
  const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: 'Invalid Post ID' });
  }

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(httpStatus.NOT_FOUND).json({ message: 'Post not found' });
  }

  const newComment = new Comment({
    user: req.body.user,
    post: post._id,
    content: req.body.content, 
  });
  await newComment.save();
  post.comments.push(newComment._id);

  await post.save();

  res.status(httpStatus.CREATED).json({ message: 'Comment created successfully', comment: newComment });
});

const deleteComment = catchAsync(async (req, res) => {
    const { commentId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: 'Invalid Comment ID' });
    }
  
    const comment = await Comment.findById(commentId);
  
    if (!comment) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'Comment not found' });
    }
    const post = await Post.findByIdAndUpdate(comment.post, { $pull: { comments: comment._id } });
    await comment.remove();
    res.status(httpStatus.OK).json({ message: 'Comment deleted successfully' });
  });
module.exports = {
  createComment,
  deleteComment
};
