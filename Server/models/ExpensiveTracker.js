const mongoose = require('mongoose');

const ExpensiveTrackerSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true 
  },
  password: String
});

const ExpensiveTrackerModel = mongoose.model('users', ExpensiveTrackerSchema);

module.exports = ExpensiveTrackerModel;