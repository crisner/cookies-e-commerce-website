const express = require('express');
const mongoose = require('mongoose');

const products = require('./routes/api/products');

const app = express();

app.use(express.json());

// DB config
const db = require('./config/keys').mongoURI;

// Connect to mongo
mongoose
  .connect(db, {useNewUrlParser: true})
  .then(() => console.log('mongo connected'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/products', products)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));