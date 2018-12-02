const path = require('path');
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views'); 

const adminRoutes = require("./routes/admin");
const shopRoutes = require('./routes/shop');

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false})); // yield body-parser
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use('/', (req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page not found', path: null})
});

app.listen(8000);