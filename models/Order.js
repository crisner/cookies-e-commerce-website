const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
  number: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  shippingCost: {
    type: Number
  },
  totalCost: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['placed', 'confirmed', 'dispatched', 'delivered'],
    required: true
  },
  paid: {
    type: Boolean,
    required: true
  },
  createdOn: {
    type: Date,
    required: true
  },
  updatedOn: Date
})

// Add date
OrderSchema.pre('save', async function (next) {
  const order = this;
  if(!order.createdOn) {
    order.createdOn = new Date();
  } else if(order.isModified('items')) {
    order.updatedOn = new Date();
  }
  next();
})

module.exports = Order = mongoose.model('orders', OrderSchema);