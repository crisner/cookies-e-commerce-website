const express = require('express');
const router = express.Router();

// User model
const User = require('../../models/User');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    if(!users) {
      return res.status(400).send('No users')
    }
    res.send(users);
  } catch(err) {
    res.status(500).send(err)
  }
})

// Get user
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if(!user) {
      return res.status(404).send('Cannot find user');
    }
    res.send(user)
  } catch(err) {
    res.status(500).send(err)
  }
})

// Post a new user
router.post('/', async (req, res) => {
  const newUser = new User(req.body);
  try {
    await newUser.save();
    res.status(201).send(newUser)
  } catch(err) {
    res.status(400).send(err)
  }
})

// Update user
router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const updates = Object.keys(req.body);
  const deniedUpdates = ['googleId', 'userName'];
  const isInvalidOperation = updates.filter(update => deniedUpdates.includes(update) === true);
  console.log(isInvalidOperation)
  if(isInvalidOperation.length) {
    return res.status(400).send({error: 'Update invalid'})
  }

  try {
    const user = await User.findById(id);
    updates.forEach(update => user[update] = req.body[update]);
    await user.save();

    if(!user) {
      return res.status(404).send('User does not exist');
    }
    res.send(user);
  } catch(err) {
    res.status(400).send(err)
  }
})

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id, { useFindAndModify: false });
    if(!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send('Deleted user')
  } catch(err) {
    err => res.status(500).send(err)
  }
})

module.exports = router;