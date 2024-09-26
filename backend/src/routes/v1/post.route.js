const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');

const postValidation = require('../../validations/post.validation');
const commentValidation = require('../../validations/comment.validation');

const postsController = require('../../controllers/post.controller');
const commentController = require('../../controllers/comment.controller');


const router = express.Router();


router
    .route('/')
    .get(auth(), postsController.getAllPosts)
    .post(auth(), validate(postValidation.createPost), postsController.createPost);

router
  .route('/user/:userId')
  .get(auth(), postsController.getUserPosts);

router.route('/:postId')
    .get(auth(), postsController.getPostWithComments)
    .delete(auth(), postsController.deletePost);

router.route('/:postId/like').post(auth(), postsController.likePost);


router.route('/:postId/comment')
    .post(auth(), validate(commentValidation.createComment), commentController.createComment);

router.route('/comment/:commentId')
    .delete(auth(), commentController.deleteComment);


module.exports = router;