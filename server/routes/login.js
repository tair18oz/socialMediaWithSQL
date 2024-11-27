var express = require("express");
var router = express.Router();
const { con } = require("../con");

/* GET users listing. */
router.post("/", function (req, res, next) {
  let name = req.body.name;
  let password = Number(req.body.password);
  const sql = `SELECT * FROM ident WHERE username = '${req.body.name}' AND password = ${req.body.password}`;
  try {
    if (!name || typeof password !== "number" || typeof name !== "string" || password.toString().length < 5) {
      throw new Error("invalid input");
    }
    con.query(sql, function (err, result) {
      if (err) {
        res.status(500).send("Server error");
        return;
      }
      if (result.length > 0) {
        res.send({ message: "Login successful!", username: req.body.name });
      } else {
        res.status(401).send("Wrong username or password");
      }
    });
  } catch (err) {
    res.status(401).send(err);
  }
});

module.exports = router;

/////////////////////////////////////////////////////////////////////////////////////////////////////
