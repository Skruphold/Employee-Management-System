const mysql = require('mysql2');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3001,
    user: "root",
    password: "RootRoot1",
    database: "company_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected");
});

module.exports = connection;