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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  } 
})

module.exports = Order = mongoose.model('orders', OrderSchema);