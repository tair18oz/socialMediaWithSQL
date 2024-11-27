var express = require("express");
var router = express.Router();
const { con } = require("../con");

// POST request to check if username exists
router.post("/register", function (req, res, next) {
    const username = req.body.username; // Get username from the request body

    let sql = `SELECT * FROM user WHERE username = "${username}"`;

    con.query(sql, function (err, results) {
        if (err) {
            return res.status(500).send("Server error");
        }

        if (results.length > 0) {
            // If username exists
            return res.json({ body: { userExist: "true" } });
        } else {
            // If username does not exist
            return res.json({ body: { userExist: "false" } });
        }
    });
});

// POST request to create a new user
router.post("/user", function (req, res, next) {
    let { username, email, password } = req.body;

    if (password.length < 5 || !email || !username) {
        return res.status(400).send("Invalid details.");
    }

    let sqlCheck = `SELECT * FROM user WHERE username = "${username}"`;
    con.query(sqlCheck, function (err, results) {
        if (err) {
            console.error("Error checking username:", err.message);
            return res.status(500).send("Server error.");
        }

        if (results.length > 0) {
            return res.status(400).send("Username already exists.");
        } else {
            // Insert new user into the database
            let sqlInsertUser = `INSERT INTO user (username, email) VALUES ("${username}", "${email}")`;
            con.query(sqlInsertUser, function (err, result) {
                if (err) {
                    return res.status(500).send("Error creating user.");
                }

                // Insert password into 'ident' table
                let sqlInsertIdent = `INSERT INTO ident (username, password) VALUES ('${username}', '${password}')`;
                con.query(sqlInsertIdent, function (err, result) {
                    if (err) {
                        return res.status(500).send("Error saving password.");
                    }

                    return res.send("User created successfully.");
                });
            });
        }
    });
});

module.exports = router;
