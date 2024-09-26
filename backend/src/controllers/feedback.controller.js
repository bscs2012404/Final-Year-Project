const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { Feedback, User } = require('../models');
const mongoose = require('mongoose');

// Create Feedback
const createFeedback = catchAsync(async (req, res) => {
  const { content } = req.body;
  const userId = req.user._id;

  const newFeedback = await Feedback.create({ content, user: userId });

  res.status(httpStatus.CREATED).json({ message: 'Feedback created successfully', feedback: newFeedback });
});

// Get all Feedbacks
const getAllFeedbacks = catchAsync(async (req, res) => {
  const allFeedbacks = await Feedback.find().populate('user', 'firstName lastName email');
  res.status(httpStatus.OK).json({ feedbacks: allFeedbacks });
});

// Get Feedback by ID
const getFeedbackById = catchAsync(async (req, res) => {
  const { feedbackId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(feedbackId)) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: 'Invalid Feedback ID' });
  }
  const feedback = await Feedback.findById(feedbackId).populate('user', 'firstName lastName email');

  if (!feedback) {
    return res.status(httpStatus.NOT_FOUND).json({ message: 'Feedback not found' });
  }

  res.status(httpStatus.OK).json({ feedback });
});

// Delete Feedback by ID
const deleteFeedbackById = catchAsync(async (req, res) => {
  const { feedbackId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(feedbackId)) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: 'Invalid Feedback ID' });
  }

  const feedback = await Feedback.findById(feedbackId);

  if (!feedback) {
    return res.status(httpStatus.NOT_FOUND).json({ message: 'Feedback not found' });
  }


  await feedback.remove();

  res.status(httpStatus.OK).json({ message: 'Feedback deleted successfully' });
});

// Update Feedback by ID
const updateFeedbackById = catchAsync(async (req, res) => {
    const { feedbackId } = req.params;
    const { content } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(feedbackId)) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: 'Invalid Feedback ID' });
    }
  
    const feedback = await Feedback.findById(feedbackId);
  
    if (!feedback) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'Feedback not found' });
    }
  
    // Check if the user making the request is the owner of the feedback
    if (!feedback.user.equals(req.user._id)) {
      return res.status(httpStatus.FORBIDDEN).json({ message: 'Permission denied. You are not the owner of this feedback.' });
    }
  
    // Update the feedback
    feedback.content = content;
    await feedback.save();
  
    res.status(httpStatus.OK).json({ message: 'Feedback updated successfully', feedback });
  });
  
module.exports = {
  createFeedback,
  getAllFeedbacks,
  getFeedbackById,
  deleteFeedbackById,
  updateFeedbackById
};
