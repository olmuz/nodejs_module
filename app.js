const express = require("express");
const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require('./routes/shop');

const bodyParser = require("body-parser");

app.use(adminRoutes);
app.use(shopRoutes);

app.use(bodyParser.urlencoded({extended: false})); // yield body-parser

app.use('/', (req, res, next) => {
    res.status(404).send('<h1>Page not found</h1>');
});

app.listen(8000);