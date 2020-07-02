const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const UserSchema = new Schema ({
  googleId: String,
  firstName: String,
  lastName: String,
  userName: {
    type: String,
    default: 'User'
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error('Email is invalid!');
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password too short'],
    maxlength: [10, 'Password is too long'],
    trim: true,
    validate(value) {
      if(value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain the word \'password\'');
      }
    }
  }
})

module.exports = User = mongoose.model('users', UserSchema);