const mongoose = require('mongoose');
const { Schema } = mongoose;

const ShippingSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    require: true
  },
  city: {
    type: String,
    require: true
  },
  state: {
    type: String,
    require: true
  },
  country: {
    type: String,
    require: true
  },
  pincode: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  }
})

// Connect user to orders
ShippingSchema.virtual('orders', {
  ref: 'orders',
  localField: '_id',
  foreignField: 'shippingId'
})

module.exports = Shipping = mongoose.model('shipping', ShippingSchema);