const mysql = require("mysql");

const mySqlConnection = mysql.createConnection({
    host: "185.27.134.212",
    user: "id17805600_root",
    password: "iII5PcXmmcBv",
    database: "epiz_31127704_aed",
    multipleStatements: true
});

mySqlConnection.connect(err => {
    if (err) console.log(err);
    else console.log("Database Connected!");
});

module.exports = mySqlConnection;