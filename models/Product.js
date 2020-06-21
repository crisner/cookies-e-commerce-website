const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  image:{
    type: String,
    required: true
  },
  imageLarge: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  boxPrice: {
    type: Number,
    required: true
  },
  description: {
    type: String
  }
});

module.exports = Product = mongoose.model('product', ProductSchema);
