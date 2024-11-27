const mysql = require("mysql");
let con;

con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "z10mz10m",
  database: "project7",
});

module.exports = { con };
