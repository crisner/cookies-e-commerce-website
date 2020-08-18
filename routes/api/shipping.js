const express = require('express');
const router = express.Router();
const {isAuth, isAdmin} = require('../../services/authMiddleware');

// Shipping info model
const Shipping = require('../../models/Shipping');

// Get all shipping details
router.get('/', isAuth, async (req, res) => {
  try {
    let shippingDetails;
    if(req.user.role === 'admin') {
      shippingDetails = await Shipping.find({});
    } else {
      await req.user.populate('shipping').execPopulate();
      shippingDetails = req.user.shipping;
    }
    if(!shippingDetails) {
      res.status(404).send('Shipping details not found');
    }
    res.status(200).send(shippingDetails);
  } catch(err) {
    res.status(500).send({error: err});
  }
})

// Get shipping details by id
router.get('/:id', isAuth, isAdmin, async (req, res) => {
  const id = req.params.id;
  try {
    const shippingDetails = await Shipping.findById(id);
    if(!shippingDetails) {
      res.status(404).send('Shipping details not added');
    }
    res.status(200).send(shippingDetails);
  } catch(err) {
    res.status(500).send({error: err});
  }
})

// Get shipping details by user id
router.get('/users/:userId', isAuth, isAdmin, async (req, res) => {
  try {
    const shippingDetails = await Shipping.find({ userId: req.params.userId });
    
    if(!shippingDetails) {
      res.status(404).send('Shipping details not found');
    }
    res.status(200).send(shippingDetails);

  } catch(err) {
    res.status(500).send({error: err});
  }
})

// Post shipping details
router.post('/', isAuth, async(req, res) => {
  try {
    const newShipping = new Shipping({
      ...req.body,
      userId: req.user._id
    });
    await newShipping.save();
    res.send(newShipping);
  } catch(err) {
    res.status(500).send(err);
  }
})

// Edit shipping details
router.patch('/:id', isAuth, async(req, res) => {
  const allowedupdates = ['name', 'address', 'city', 'state', 'country', 'pincode', 'phone'];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every(update => allowedupdates.includes(update));
  if(!isValidOperation) {
    return res.status(400).send({error: 'Update invalid'});
  }
  try {
    const shippingDetails = await Shipping.findOne({ _id: req.params.id, userId: req.user._id})
    if(!shippingDetails) {
      res.status(404).send('not found');
    }
    updates.forEach(update => shippingDetails[update] = req.body[update]);
    await shippingDetails.save();
    res.send(shippingDetails);
  } catch(err) {
    res.status(400).send(err)
  }
})

// Delete shipping details
router.delete('/:id', isAuth, async(req, res) => {
  try {
    const shippingDetails = await Shipping.findOneAndDelete({ _id: req.params.id, userId: req.user._id})
    if(!shippingDetails) {
      res.status(404).send('not found');
    }
    res.status(200).send('Deleted');
  } catch(err) {
    res.status(400).send(err)
  }
})

module.exports = router;