const path = require('path');
const express = require("express");
const app = express();

app.set('view engine', 'pug');
app.set('views', 'views'); 

const adminData = require("./routes/admin");
const shopRoutes = require('./routes/shop');

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false})); // yield body-parser
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use('/', (req, res, next) => {
    res.status(404).render('404', {docTitle: 'Page not found'})
});

app.listen(8000);