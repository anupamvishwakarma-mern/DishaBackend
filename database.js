const mysql = require("mysql");
require('dotenv').config();

const pool = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
})

// pool.connect(function (err) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('connected')
//     }
// })

module.exports = pool;