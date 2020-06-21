const express = require('express');
const router = express.Router();

// Product model
const Product = require('../../models/Product');

// GET all products
router.get('/', (req, res) => {
  Product.find()
    .then(products => res.json(products))
})

module.exports = router;