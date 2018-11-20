const express = require("express");
const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require('./routes/shop');

const bodyParser = require("body-parser");

app.use(adminRoutes);
app.use(shopRoutes);

app.use(bodyParser.urlencoded({extended: false})); // yield body-parser

app.listen(8000);