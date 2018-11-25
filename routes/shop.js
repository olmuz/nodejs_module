const express = require('express');
const path = require('path');

const rootDir = require('../util/path');

const adminData = require('./admin');

const router = express.Router();

const products = adminData.products;


router.get('/', (req, res, next) => {
    res.render('shop', {prods: products, pageTitle: 'My Shop', path: '/'});
});

module.exports = router;