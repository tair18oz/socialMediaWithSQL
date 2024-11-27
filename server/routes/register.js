const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "z10mz10m",
  database: "noIdea",
});

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/", function (req, res, next) {
  //   let sql = `INSERT INTO classroom (grade, classroom_index, teacher_id) VALUES (${body.grade},${body.classroom_index},${body.teacher_id})`;
  //   //   console.log("sql: ", sql);
  //   con.query(sql, function (err, result) {
  //     if (err) throw err;
  //     else console.log("new classroom added");
  //   });

  res.send(req.body.lotsof);
});
module.exports = router;

// var sql = "INSERT INTO  (name, address) VALUES ('Company Inc', 'Highway 37')";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted")})
