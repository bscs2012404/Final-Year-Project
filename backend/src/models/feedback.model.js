const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const feedbackSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
feedbackSchema.plugin(toJSON);

/**
 * @typedef Feedback
 */
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
