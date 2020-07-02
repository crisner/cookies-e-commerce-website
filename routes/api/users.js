const express = require('express');
const router = express.Router();

// User model
const User = require('../../models/User');

// Get all users
router.get('/', (req, res) => {
  User.find({})
  .then(users => res.send(users))
  .catch(err => res.status(500).send(err));
})

// Get user
router.get('/:id', (req, res) => {
  const id = req.params.id;
  User.findById(id)
  .then(user => {
    if(!user) {
      return res.status(404).send('Cannot find user');
    }
    res.send(user)
  })
  .catch(err => res.status(500).send(err));
})

// Post a new user
router.post('/', (req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: req.body.password
  });

  newUser.save()
  .then(user => res.send(user))
  .catch(err => res.status(400).send(err))
})

// Update user
router.patch('/:id', (req, res) => {
  const id = req.params.id;
 
  User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true, useFindAndModify: false })
  .then(user => {
    if(!user) {
      return res.status(404).send('Cannot find user');
    }
    res.send(user)
  })
  .catch(err => res.status(500).send(err));
})

// Delete a user
router.delete('/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id, { useFindAndModify: false }).then(user => {
    if(!user) {
      res.status(404).send('User not found');
    } else {
      res.send('Deleted user')
    }
  }).catch(err => res.status(500).send(err))
})

module.exports = router;