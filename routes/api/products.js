const express = require('express');
const router = express.Router();
const {isAuth, isAdmin} = require('../../services/authMiddleware');

// Product model
const Product = require('../../models/Product');

// GET all products
router.get('/', (req, res) => {
  Product.find()
    .then(products => res.json(products))
})

// POST a product to api/products
router.post('/', isAuth, isAdmin, (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    image: req.body.image,
    price: req.body.price,
    boxPrice: req.body.boxPrice,
    description: req.body.description
  });

  newProduct.save().then(item => res.send(item));
})

// DELETE a product
router.delete('/:id', isAuth, isAdmin, (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(product => {
      if(!product) {
        res.status(404);
        res.send('not found')
      } else {
        res.send('success');
      }
    })
    .catch(err => res.status(500))
})

module.exports = router;