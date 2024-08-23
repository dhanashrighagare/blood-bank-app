const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        // Basic phone number validation
        return /\d{10}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  email: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        // Basic email validation
        return /^([\w-]+(?:\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7})$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Middleware to update the updatedAt field before saving
donorSchema.pre('save', function(next) {
  if (this.isModified()) { // Only update if the document is modified
    this.updatedAt = Date.now();
  }
  next();
});

// Create the Donor model
const Donor = mongoose.model('Donor', donorSchema);

module.exports = Donor;
