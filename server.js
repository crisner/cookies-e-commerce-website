const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./services/passport');

const keys = require('./config/keys');
const products = require('./routes/api/products');
const users = require('./routes/api/users');

const app = express();

app.use(express.json());

// DB config
const db = keys.mongoURI;

// Connect to mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('mongo connected'))
  .catch(err => console.log(err));

// Use cookies for session storage
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Use Routes
app.use('/api/products', products)
app.use('/api/users', users)
require('./routes/authRoutes')(app);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));