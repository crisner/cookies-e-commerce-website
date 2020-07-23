const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
require('./services/passport');

const keys = require('./config/keys');
const products = require('./routes/api/products');
const users = require('./routes/api/users');

const app = express();
app.use(cookieParser())
app.use(express.json());

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
require('./routes/authRoutes')(app);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));