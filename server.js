const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to mongo
mongoose
.connect('mongodb://localhost:27017/cookiesinc', {useNewUrlParser: true})
.then(() => console.log('mongo connected'))
.catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));