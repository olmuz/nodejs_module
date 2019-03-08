const path = require('path');
const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const config = require('config');
const mongoConnectUrl = config.get('mongoConnectUrl');

const errorController = require('./controllers/error');

const User = require('./models/user');

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require("./routes/admin");
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false })); // yield body-parser
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5c818a26203a122b848aa906')
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use('/', errorController.get404);

mongoose.connect(mongoConnectUrl)
  .then(
    app.listen(8000)
  )
  .catch(err => console.log(err));