const express = require('express');
const router = express.Router();
const {isAuth, isAdmin} = require('../../services/authMiddleware');

// Order model
const Order = require('../../models/Order');

// Get all orders
router.get('/', isAuth, isAdmin, async(req, res) => {
  try {
    const orders = await Order.find({});
    if(!orders) {
      res.status(404).send('No orders');
    }
    res.send(orders);
  } catch(err) {
    res.status(500).send(err);
  }
})

// Get orders by status
router.get('/:status', isAuth, isAdmin, async(req, res) => {
  try {
    const status = req.params.status;
    const noOfMonths = req.query.months;
    let orders;
    if(noOfMonths) { // filter by number of months
      const to = new Date();
      const currentMonth = new Date().getMonth();
      const setMonth = new Date().setMonth(currentMonth - noOfMonths);
      const from = new Date(setMonth);
      orders = await Order.find({status, createdOn: { $gte: from, $lte: to }});
    } else {
      orders = await Order.find({status});
    }

    if(!orders) {
      res.status(404).send('Not found');
    }
    res.send(orders);
  } catch(err) {
    res.status(500).send(err);
  }
})

// Get order by id
router.get('/order/:id', isAuth, isAdmin, async(req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if(!order) {
      res.status(404).send();
    }
    res.send(order);
  } catch(err) {
    res.status(500).send(err);
  }
})

// Post new order
router.post('/', isAuth, async(req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.send(newOrder);
  } catch(err) {
    res.status(500).send(err);
  }
})

// Update order
router.patch('/:id', isAuth, isAdmin, async(req, res) => {
  const allowedUpdates = ['status'];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  if(!isValidOperation) {
    return res.status(400).send({error: 'Update invalid'})
  }
  try {
    const order = await Order.findById(req.params.id);
    if(!order) {
      res.status(404).send();
    }
    updates.forEach(update => order[update] = req.body[update]);
    await order.save();
    res.send(order);
  } catch(err) {
    res.status(500).send(err);
  }
})

module.exports = router;