const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const mongoose = require('mongoose');
const { Post } = require('../models');

const createPost = catchAsync(async (req, res) => {
  const post = await Post.create(req.body);
  res.status(httpStatus.CREATED).send(post);
});
const getAllPosts = catchAsync(async (req, res) => {
  const allPosts = await Post.find()
    .populate({
      path: 'comments',
      populate: {
        path: 'user', // Populate the user field of each comment
        model: 'User',
        select: 'firstName lastName email createdAt updatedAt',
      },
    })
    .populate({
      path: 'user',
      populate: {
        path: 'user', // Populate the user field of each comment
        model: 'User',
      },
    });
  res.send(allPosts);
});

const getUserPosts = catchAsync(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: 'Invalid Id' });
  }
  const allPosts = await Post.find({ user: req.params.userId })
    .populate({
      path: 'comments',
      populate: {
        path: 'user', // Populate the user field of each comment
        model: 'User',
        select: 'firstName lastName email createdAt updatedAt',
      },
    })
    .populate({
      path: 'user',
      populate: {
        path: 'user', // Populate the user field of each comment
        model: 'User',
      },
    });
  res.send(allPosts);
});

const likePost = catchAsync(async (req, res) => {
  const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: 'Invalid Post ID' });
  }
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(httpStatus.NOT_FOUND).json({ message: 'Post not found' });
  }

  const userLikedIndex = post.likedBy.findIndex((userId) => userId.equals(req.user._id));

  if (userLikedIndex !== -1) {
    post.likedBy.splice(userLikedIndex, 1);
  } else {
    post.likedBy.push(req.user._id);
  }
  await post.save();

  res.status(httpStatus.OK).json({ message: 'Post liked successfully', post });
});

const deletePost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: 'Invalid Post ID' });
  }

  const post = await Post.findById(postId);
  if (!post) {
    return res.status(httpStatus.NOT_FOUND).json({ message: 'Post not found' });
  }
  await post.remove();

  res.status(httpStatus.OK).json({ message: 'Post deleted successfully' });
});

const getPostWithComments = catchAsync(async (req, res) => {
  const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: 'Invalid Post ID' });
  }

  const post = await Post.findById(postId).populate({
    path: 'comments',
    populate: {
      path: 'user', // Populate the user field of each comment
      model: 'User',
      select: 'firstName lastName email createdAt updatedAt',
    },
  });
  console.log(post);
  if (!post) {
    return res.status(httpStatus.NOT_FOUND).json({ message: 'Post not found' });
  }
  res.status(httpStatus.OK).json({ post });
});

module.exports = {
  createPost,
  getAllPosts,
  getUserPosts,
  likePost,
  deletePost,
  getPostWithComments,
};
