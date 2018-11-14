const express = require("express");

const app = express();

app.use('/', (req, res, next) => {
    console.log('intercepts all requests');
    next();
})

app.use('/add-product', (req, res, next) => {
    res.send('<h1>The "Add Product" Page</h1>');
})

app.use('/', (req, res, next) => {
    res.send('<h1>Hello from express</h1>');
})

app.listen(8000);