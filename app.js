const path = require('path');
const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const config = require('config');
const mongoConnectUrl = config.get('mongoConnectUrl');

const errorController = require('./controllers/error');

const User = require('./models/user');

const store = new MongoDBStore({
  uri: mongoConnectUrl,
  collection: 'sessions'
})

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

app.use((req, res, next) => {
  User.findById('5c827a0e022cef2a90e64c09')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use('/', errorController.get404);

mongoose.connect(mongoConnectUrl)
  .then(result => {
    User.findOne()
      .then(user => {
        if (!user) {
          const user = new User({
            name: 'Oleh',
            email: 'oleh@test.com',
            cart: {
              items: []
            }
          });
          user.save();
        }
      })
    app.listen(8000);
  })
  .catch(err => console.log(err));