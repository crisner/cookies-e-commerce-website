const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
// const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
require('./services/passport');

const keys = require('./config/keys');
const products = require('./routes/api/products');
const users = require('./routes/api/users');
const orders = require('./routes/api/orders');
const shipping = require('./routes/api/shipping');

const publicPath = path.join(__dirname, 'client', 'public');

const app = express();

// DB config
const db = keys.mongoURI;

// Connect to mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('mongo connected'))
  .catch(err => console.log(err));

app.use(express.static(publicPath));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use cookies for session storage
// app.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: [keys.cookieKey]
//   })
// );
// app.set('trust proxy', 1);
app.use(
  session({
    secret: keys.cookieKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Use Routes
app.use('/api/products', products)
app.use('/api/users', users)
app.use('/api/orders', orders)
app.use('/api/shipping', shipping)
require('./routes/authRoutes')(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));