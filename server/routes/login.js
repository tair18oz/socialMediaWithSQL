var express = require("express");
var router = express.Router();
const { con } = require("../con");

/* GET users listing. */
router.post("/", function (req, res, next) {
  const sql = `SELECT * FROM ident WHERE username = '${req.body.name}' AND password = ${req.body.password}`;
  con.query(sql, function (err, result) {
    if (err) {
      res.status(500).send("Server error");
      return;
    }

    // Check if any rows are returned
    if (result.length > 0) {
      res.send({ success: true, message: "Login successful!", username: req.body.name });
    } else {
      res.status(401).send({ success: false, message: "Wrong username or password" });
    }
  });
});

module.exports = router;

/////////////////////////////////////////////////////////////////////////////////////////////////////
