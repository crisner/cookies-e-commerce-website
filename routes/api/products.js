const express = require('express');
const router = express.Router();
const {isAuth, isAdmin} = require('../../services/authMiddleware');

// Product model
const Product = require('../../models/Product');

// GET all products
router.get('/', isAuth, async(req, res) => {
  try {
    const products = await Product.find({});
    if(!products) {
      return res.status(400).send('No products')
    }
    res.send(products);
  } catch(err) {
    res.status(500).send({ error: err })
  }
})

// POST a product to api/products
router.post('/', isAuth, isAdmin, async(req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
      boxPrice: req.body.boxPrice,
      description: req.body.description
    });
  
    await newProduct.save()
    res.send(newProduct)
  } catch(err) {
    res.status(500).send({ error: err })
  }
})

// DELETE a product
router.delete('/:id', isAuth, isAdmin, async(req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if(!product) {
      res.status(404);
      res.send('not found')
    }
    res.send('deleted');
  } catch(err) {
    res.status(500).send({ error: err });
  }
})


module.exports = router;