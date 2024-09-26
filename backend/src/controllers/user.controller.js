const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const { v4: uuidv4 } = require('uuid'); // Import the uuid package
const multerConfig = require('../config/multer.config');
const { User, Education, Experience } = require('../models');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['firstName','lastName', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.userId)
    .populate('educations')
    .populate('experiences')  
    .populate('friends'); 

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const uploadImage = catchAsync(async (req, res) => {
  multerConfig.uploadImage(req, res, async function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }
    const fullUrl = req.protocol + '://' + req.get('host');

    const userId = req.user.id;
    const user = await userService.getUserById(userId);

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    const imagePath = fullUrl + '/uploads/' + req.file.filename;

    user.profileImage = imagePath;
    user.save();
    const file = req.file;
    res.status(httpStatus.OK).json({ message: 'File saved successfully', profileImage: imagePath });
  });
});
const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body, 'updateUser');
  res.send(user);
});

const updateME = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const user = await userService.updateUserById(userId, req.body, 'updateUser');
  res.send(user);
});
const updateUserLocation = catchAsync(async (req, res) => {
  const { longitude, latitude } = req.body;
  if (typeof longitude !== 'number' || typeof latitude !== 'number') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid longitude or latitude');
  }
  
  const user = await userService.updateUserById(req.user.id, {
    location: {
      type: 'Point',
      coordinates: [longitude, latitude]
    }
  });
  
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  res.status(httpStatus.OK).send({ message: 'Location updated successfully' });
});

const getNearbyUsers = catchAsync(async (req, res) => {
  const { longitude, latitude, maxDistance } = req.query;
  if (typeof longitude !== 'number' || typeof latitude !== 'number' || typeof maxDistance !== 'number') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid longitude, latitude, or maxDistance');
  }
  
  const users = await userService.getNearbyUsers(longitude, latitude, maxDistance);
  res.status(httpStatus.OK).send(users);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const addFriend = catchAsync(async (req, res) => {
  const friendId = req.params.friendId;
  const userId = req.user.id;
  if (userId === friendId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cannot add yourself as a friend');
  }

  const user = await User.findById(userId);
  const friend = await User.findById(friendId);

  if (!user || !friend) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (user.friends.includes(friendId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User is already a friend');
  }

  user.friends.push(friendId);
  await user.save();

  res.status(httpStatus.OK).send({ message: 'Friend added successfully' });
});
const removeFriend = catchAsync(async (req, res) => {
  const friendId = req.params.friendId;

  const userId = req.user.id;

  const user = await User.findById(userId);
  const friend = await User.findById(friendId);

  if (!user || !friend) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (!user.friends.includes(friendId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User is not a friend');
  }

  user.friends = user.friends.filter((id) => id.toString() !== friendId);
  await user.save();

  res.status(httpStatus.OK).send({ message: 'Friend removed successfully' });
});
const getAllFriends = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const user = await User.findById(userId).populate('friends');

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  res.status(httpStatus.OK).send(user.friends);
});

const searchUsers = catchAsync(async (req, res) => {
  const { searchTerm } = req.query;
  const userId = req.user._id;

  const results = await User.searchUsersByName(searchTerm, userId);

  res.status(httpStatus.OK).json(results);
});
const getEducationMatches = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const userEducation = await Education.find({ user: userId });
  if (userEducation.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User education data not found');
  }
  const userFieldsOfStudy = userEducation.map((edu) => edu.fieldOfStudy);
  const userDegrees = userEducation.map((edu) => edu.degree);
  const fieldsOfStudyPatterns = userFieldsOfStudy.map((field) => new RegExp(field, 'i'));
  const degreesPatterns = userDegrees.map((degree) => new RegExp(degree, 'i'));
  const matchedUsers = await User.find({
    _id: { $ne: userId },
  }).populate('educations');
  const rankedUsers = matchedUsers.map((matchedUser) => {
    let matchedEducationCount = 0;
    matchedUser.educations.forEach((edu) => {
      if (
        fieldsOfStudyPatterns.some((pattern) => pattern.test(edu.fieldOfStudy)) &&
        degreesPatterns.some((pattern) => pattern.test(edu.degree))
      ) {
        matchedEducationCount++;
      }
    });
    const totalEducationCount = userEducation.length;
    const similarityPercentage = (matchedEducationCount / totalEducationCount) * 100;
    return {
      user: matchedUser,
      similarityPercentage: similarityPercentage.toFixed(2),
    };
  });
  rankedUsers.sort((a, b) => b.similarityPercentage - a.similarityPercentage);
  res.status(httpStatus.OK).send(rankedUsers);
});
const getExperienceMatches = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const userExperience = await Experience.find({ user: userId });
  if (userExperience.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User experience data not found');
  }
  const userCompanies = userExperience.map((exp) => exp.company);
  const userPositions = userExperience.map((exp) => exp.position);
  const companiesPatterns = userCompanies.map((company) => new RegExp(company, 'i'));
  const positionsPatterns = userPositions.map((position) => new RegExp(position, 'i'));
  const matchedUsers = await User.find({
    _id: { $ne: userId },
  }).populate('experiences');
  const rankedUsers = matchedUsers.map((matchedUser) => {
    let matchedExperienceCount = 0;
    matchedUser.experiences.forEach((exp) => {
      if (
        companiesPatterns.some((pattern) => pattern.test(exp.company)) &&
        positionsPatterns.some((pattern) => pattern.test(exp.position))
      ) {
        matchedExperienceCount++;
      }
    });
    const totalExperienceCount = userExperience.length;
    const similarityPercentage = (matchedExperienceCount / totalExperienceCount) * 100;
    return {
      user: matchedUser,
      similarityPercentage: similarityPercentage.toFixed(2), 
    };
  });
  rankedUsers.sort((a, b) => b.similarityPercentage - a.similarityPercentage);
  res.status(httpStatus.OK).send(rankedUsers);
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  uploadImage,
  updateME,
  addFriend,
  removeFriend,
  getAllFriends,
  searchUsers,
  updateUserLocation,
  getNearbyUsers,
  getEducationMatches,
  getExperienceMatches
};
