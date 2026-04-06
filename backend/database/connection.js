const mysql = require('mysql2')

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "mysql123",
    database: "osluzias"
})

module.exports = db.promise()