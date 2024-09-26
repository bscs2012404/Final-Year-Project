const tf = require('@tensorflow/tfjs');
const mongoose = require('mongoose');
const { User } = require('../models'); // Assume the User model is defined as you provided
// Function to encode user education data
function encodeEducationData(user) {
    const educationFields = ['school', 'degree', 'fieldOfStudy', 'graduationYear'];
    return educationFields.map(field => user.educations.map(edu => edu[field] ? edu[field].length : 0));
  }
  
  // Function to prepare the training data
  function prepareTrainingData(users) {
    const trainingData = [];
    users.forEach(user => {
      const encodedUser = encodeEducationData(user);
      users.forEach(otherUser => {
        if (user._id !== otherUser._id) {
          const encodedOtherUser = encodeEducationData(otherUser);
          const input = encodedUser.concat(encodedOtherUser).flat();
          const output = [user.educations.some(edu => otherUser.educations.some(otherEdu => edu.school === otherEdu.school)) ? 1 : 0];
          trainingData.push({ input, output });
        }
      });
    });
    return trainingData;
  }
  
  // Function to create and train the model
  async function trainModel(trainingData) {
    const inputs = trainingData.map(data => data.input);
    const outputs = trainingData.map(data => data.output);
  
    const inputTensor = tf.tensor2d(inputs, [inputs.length, inputs[0].length]);
    const outputTensor = tf.tensor2d(outputs, [outputs.length, outputs[0].length]);
  
    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [inputs[0].length], units: 10, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
  
    model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });
  
    await model.fit(inputTensor, outputTensor, { epochs: 50 });
  
    return model;
  }
  
  // Function to get predicted matches
  async function getPredictedMatches(model, user, allUsers) {
    const matches = [];
    const encodedUser = encodeEducationData(user).flat();
    for (const otherUser of allUsers) {
      if (user._id !== otherUser._id) {
        const encodedOtherUser = encodeEducationData(otherUser).flat();
        const input = encodedUser.concat(encodedOtherUser);
        const inputTensor = tf.tensor2d([input], [1, input.length]);
        const output = model.predict(inputTensor).dataSync()[0];
        if (output > 0.5) {
          matches.push(otherUser);
        }
      }
    }
    return matches;
  }
  

module.exports = {
//   loadAndEncodeData,
//   createPairs,
  trainModel,
  getPredictedMatches,
  prepareTrainingData
};
