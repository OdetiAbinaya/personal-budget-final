const mongoose = require('mongoose');

const getTransactionSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

const GetTransaction = mongoose.model('Transactions', getTransactionSchema);

module.exports = GetTransaction;
