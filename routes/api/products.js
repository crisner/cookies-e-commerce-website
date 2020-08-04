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

// GET single product
router.get('/:id', isAuth, async(req, res) => {
  try {
    const product = await findById(req.params.id);
    if(!product) {
      res.status(404);
      res.send('not found')
    }
    res.status(200).send('success');
  } catch(err) {
    res.status(500).send({ error: err });
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

// Edit product information
router.patch('/:id', isAuth, isAdmin, async(req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'image', 'imageLarge', 'price', 'boxPrice', 'description'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  if(!isValidOperation) {
    return res.status(400).send({error: 'Update invalid'})
  }
  try {
    const product = await Product.findById(req.params.id);
    if(!product) {
      return res.status(404).send('Product not found');
    }
    console.log(req.body)
    updates.forEach(update => product[update] = req.body[update]);
    await product.save();
    res.send(product);
  } catch(err) {
    res.status(400).send(err)
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