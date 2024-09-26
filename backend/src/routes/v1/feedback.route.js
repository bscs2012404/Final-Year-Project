const express = require('express');
const router = express.Router();

const feedbackController = require('../../controllers/feedback.controller');
const feedbackValidation = require('../../validations/feedback.validation');

const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');

// Create Feedback
router.post('/', auth(), validate(feedbackValidation.createFeedback), feedbackController.createFeedback);

// Get all Feedbacks
router.get('/', auth(), feedbackController.getAllFeedbacks);

// Get Feedback by ID
router.get('/:feedbackId', auth(), feedbackController.getFeedbackById);

router.put('/:feedbackId', auth(), validate(feedbackValidation.createFeedback), feedbackController.updateFeedbackById);

// Delete Feedback by ID
router.delete('/:feedbackId', auth(), feedbackController.deleteFeedbackById);

module.exports = router;
