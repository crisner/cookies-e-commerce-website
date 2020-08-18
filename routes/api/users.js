const express = require('express');
const router = express.Router();
const {isAuth, isAdmin} = require('../../services/authMiddleware');

// User model
const User = require('../../models/User');

// Get all users
router.get('/', isAuth, isAdmin, async (req, res) => {
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
router.get('/profile', isAuth, (req, res) => {
    res.send(req.user);
})

// Get user shipping
router.get('/saved-addresses', isAuth, isAdmin, async (req, res) => {
  try {
    await req.user.populate('shipping').execPopulate();
    const shippingDetails = req.user.shipping;
    if(!shippingDetails) {
      res.status(404).send('Shipping details not found');
    }
    res.status(200).send(shippingDetails);

  } catch(err) {
    res.status(500).send({error: err});
  }
})

// Update user
router.patch('/profile', isAuth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'firstName', 'lastName'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  if(!isValidOperation) {
    return res.status(400).send({error: 'Update invalid'})
  }

  try {
    updates.forEach(update => req.user[update] = req.body[update]);
    await req.user.save();
    res.send(req.user);
  } catch(err) {
    res.status(400).send(err)
  }
})

// Delete a user
router.delete('/profile', isAuth, async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).send('Deleted user')
  } catch(err) {
    err => res.status(500).send(err)
  }
})

module.exports = router;