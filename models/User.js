const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

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
    unique: true,
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
    // maxlength: [10, 'Password is too long'],
    trim: true,
    validate(value) {
      if(value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain the word \'password\'');
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})

// Generate auth tokens
UserSchema.methods.generateAuthToken = async function(payload) {
  const user = this;
  // Generate a signed web token
  const token = jwt.sign(payload, keys.jwtSecret, {expiresIn: '3d'});

  // Save token to the user
  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
}

// checking if password is valid
UserSchema.methods.isValidPassword = (password, userPassword) => {
  const isMatch = bcrypt.compare(password, userPassword);
  return isMatch;
};

// Hash password before save()
UserSchema.pre('save', async function (next) {
  const user = this;
  if(user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
})

module.exports = User = mongoose.model('users', UserSchema);