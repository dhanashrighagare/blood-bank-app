const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: function() { return this.role === 'Donor' || this.role === 'Admin'; },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, 
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Admin', 'Donor', 'Hospital', 'Organisation'], 
    default: 'Donor', 
  },
  organisationName: {
    type: String,
    required: function() { return this.role === 'Organization'; }, 
  },
  hospitalName: {
    type: String,
    required: function() { return this.role === 'Hospital'; }, 
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetTokenExpires: {
    type: Date,
  },
});

// Validate that the role-specific fields are provided based on role
userSchema.pre('save', function(next) {
  if (this.isModified('role')) {
    if (this.role === 'Organization' && !this.organisationName) {
      return next(new Error('Organisation name is required for Organization role'));
    }
    if (this.role === 'Hospital' && !this.hospitalName) {
      return next(new Error('Hospital name is required for Hospital role'));
    }
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
