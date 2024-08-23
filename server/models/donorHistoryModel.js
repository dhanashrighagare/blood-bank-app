const mongoose = require('mongoose');

const donorHistorySchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model (assuming donors are users)
    required: true,
  },
  donationDate: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number, // Quantity of blood donated
    required: true,
  },
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const DonorHistory = mongoose.model('DonorHistory', donorHistorySchema);

module.exports = DonorHistory;
