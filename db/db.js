const mysql = require("mysql");

const mySqlConnection = mysql.createConnection({
    host: "sql6.freesqldatabase.com",
    user: "sql6475499",
    password: "4DGPY7BrXr",
    database: "sql6475499",
    multipleStatements: true
});


mySqlConnection.connect(err => {
    if (err) console.log(err);
    else console.log("Database Connected!");
});

module.exports = mySqlConnection;