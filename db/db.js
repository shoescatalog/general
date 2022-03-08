const mysql = require("mysql");

const mySqlConnection = mysql.createConnection({
    host: "sql6.freesqldatabase.com",
    user: "sql6477569",
    password: "jt7xq4fqcf",
    database: "sql6477569",
    multipleStatements: true
});


mySqlConnection.connect(err => {
    if (err) console.log(err);
    else console.log("Database Connected!");
});

module.exports = mySqlConnection;