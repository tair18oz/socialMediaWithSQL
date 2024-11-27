var express = require("express");
var router = express.Router();
const { con } = require("../con");

router.post("/", function (req, res, next) {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;

  try {
    if (typeof password === "number") {
      password = password.toString();
    } else {
      console.log("password is string");
      throw new Error("change the password");
    }

    if (password.length < 5 || !email) {
      console.log("Validation failed");
      throw new Error("There is an error in your details: Invalid password, email, or username.");
    }

    let sqlCheck = `SELECT * FROM user WHERE username = "${name}"`;
    con.query(sqlCheck, function (err, results) {
      if (err) {
        console.error("Error checking username:", err.message);
        throw err;
      }

      if (results.length > 0) {
        console.log("Username already exists");
        return res.status(400).send("Username already exists. Please choose a different username.");
      } else {
        let sqlInsertUser = `INSERT INTO user (username, email) VALUES ("${name}", "${email}")`;
        con.query(sqlInsertUser, [name, email], function (err, result) {
          if (err) {
            console.error("Error executing query for user:", err.message);
            throw err;
          }
          console.log("Added new user to user table");

          let sqlInsertIdent = `INSERT INTO ident (username, password) VALUES ('${name}', '${password}')`;
          con.query(sqlInsertIdent, [name, password], function (err, result) {
            if (err) {
              console.error("Error executing query for ident:", err.message);
              throw err;
            }
            console.log("Added new user to ident table");

            res.send("Details are valid. User has been created.");
          });
        });
      }
    });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(400).send(err.message);
  }
});

module.exports = router;
