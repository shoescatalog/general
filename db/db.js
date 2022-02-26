const mysql = require("mysql");

const mySqlConnection = mysql.createConnection({
    host: "sql204.epizy.com",
    user: "epiz_31127704",
    password: "iII5PcXmmcBv",
    database: "epiz_31127704_aed",
    multipleStatements: true
});

mySqlConnection.connect(err => {
    if (err) console.log(err);
    else console.log("Database Connected!");
});

module.exports = mySqlConnection;