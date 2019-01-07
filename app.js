const path = require('path');
const express = require("express");

const app = express();
const bodyParser = require("body-parser");

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require("./routes/admin");
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false })); // yield body-parser
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use('/', errorController.get404);

sequelize
  .sync()
  .then(result => {
    console.log(result);
    app.listen(8000);
  })
  .catch(err => {
    console.log(err)
  });