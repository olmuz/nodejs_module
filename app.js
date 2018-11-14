const express = require("express");

const app = express();

app.use((req, res, next) => {
    console.log('In the Middlewere!');
    next();
})

app.use((req, res, next) => {
    console.log('In another Middlewere!');
    res.send('<h1>Hello from express</h1>');
})

app.listen(8000);