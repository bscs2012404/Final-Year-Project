const Joi = require('joi');
const httpStatus = require('http-status');

// Validation schema for creating or updating feedback
const createFeedback = {
  body: Joi.object().keys({
    content: Joi.string().required()
  }),
};


module.exports = {
  createFeedback
};
