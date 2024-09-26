const Joi = require('joi');

const createPost = {
  body: Joi.object().keys({
    title: Joi.string(),
    content: Joi.string().required(),
    // Assuming that the user ID is provided when creating a post
    user: Joi.string().required(), // You may want to validate this as a valid MongoDB ObjectId
  }),
};

module.exports = {
  createPost,
};
