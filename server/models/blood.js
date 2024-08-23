const mongoose = require('mongoose');

const bloodSchema = new mongoose.Schema({
  bloodType: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Blood', bloodSchema);
