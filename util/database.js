const mysql = require('mysql2');


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complite',
    password: '1111'
});

module.exports = pool.promise();