const path = require('path');
const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const config = require('config');
const mongoConnectUrl = config.get('mongoConnectUrl');

const errorController = require('./controllers/error');

const User = require('./models/user');

const store = new MongoDBStore({
  uri: mongoConnectUrl,
  collection: 'sessions'
});

const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require("./routes/admin");
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false })); // yield body-parser
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'My secure secret',
  resave: false,
  saveUninitialized: false,
  store: store
}));

app.use(csrfProtection);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use('/', errorController.get404);

mongoose.connect(mongoConnectUrl)
  .then(result => {
    app.listen(8000);
  })
  .catch(err => console.log(err));