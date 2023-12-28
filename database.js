const mysql = require("mysql");
require('dotenv').config();

const pool = mysql.createConnection({
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: 'root1234',
    database: 'anupamdb',
    connectionLimit: 100,
})

pool.connect(function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log('connected')
    }
})

module.exports = pool;