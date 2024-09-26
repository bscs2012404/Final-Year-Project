const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
  }),
};
const updateUserLocation = {
  body: Joi.object().keys({
    longitude: Joi.number().required(),
    latitude: Joi.number().required(),
  }),
};

const getNearbyUsers = {
  query: Joi.object().keys({
    longitude: Joi.number().required(),
    latitude: Joi.number().required(),
    maxDistance: Joi.number().required(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const friendParams = {
  params: Joi.object().keys({
    friendId: Joi.string().custom(objectId),
  }),
};
const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      // email: Joi.string().email(),
      password: Joi.string().custom(password),
      previousPassword: Joi.string().custom(password),
      address: Joi.string(),
      phoneNumber: Joi.string(),
      firstName: Joi.string(),
      lastName: Joi.string(),
      location: Joi.object({
        type: Joi.string().valid('Point'),
        coordinates: Joi.array().items(Joi.number()).length(2)
      })
    })
    .min(1),
};

const updateUserFields = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      address: Joi.string(),
      phoneNumber: Joi.string(),
      firstName: Joi.string(),
      lastName: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updateUserFields,
  friendParams,
  updateUserLocation,
  getNearbyUsers,
};
