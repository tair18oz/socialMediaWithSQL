var express = require("express");
var router = express.Router();
const { con } = require("../con");

/* GET users listing. */
router.get("/", function (req, res, next) {
  if (req.query.user === "undefined") {
    res.status(400).send("invalid username provided");
  }
  let sql = `SELECT * FROM user WHERE username = "${req.query.user}"`;
  con.query(sql, function (err, results) {
    if (err) {
      return res.status(500).send("Server error");
    }
    res.send(results[0]);
  });
});

module.exports = router;
