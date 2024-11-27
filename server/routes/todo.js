var express = require("express");
var router = express.Router();
const { con } = require("../con");
const util = require("util");
const query = util.promisify(con.query).bind(con);

const executeQuery = async (sql) => {
    try {
        const result = await query(sql);
        return result;
    } catch (err) {
        console.error("Database query failed: ", err);
        throw err;
    }
};

// POST request to add a new todo
router.post("/", async function (req, res) {
    const { user_id, title, completed } = req.body; // Changed 'userId' to 'user_id'
    const sql = `INSERT INTO todos (user_id, title, completed) VALUES ('${user_id}', '${title}', '${completed}')`; // Template literal
    try {
        const result = await executeQuery(sql);
        res.status(201).send({ todoId: result.insertId });
    } catch (err) {
        res.status(500).send("Failed to create todo.");
    }
});

// GET request to get all todos for a user
router.get("/:user_id", async function (req, res) {
    const { user_id } = req.params; // Changed 'userid' to 'user_id'
    const sql = `SELECT * FROM todos WHERE user_id = '${user_id}' ORDER BY id`; // Template literal
    try {
        const todos = await executeQuery(sql);
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).send("Failed to fetch todos.");
    }
});

// PATCH request to update a todo
router.patch("/:user_id/:id", async function (req, res) {
    const { user_id, id } = req.params; // Changed 'userid' to 'user_id'
    const { title, completed } = req.body;
    const sql = `UPDATE todos SET title = '${title}', completed = '${completed}' WHERE user_id = '${user_id}' AND id = '${id}'`; // Template literal
    try {
        const result = await executeQuery(sql);
        if (result.affectedRows > 0) {
            res.status(200).send("Todo updated successfully.");
        } else {
            res.status(404).send("Todo not found or unauthorized.");
        }
    } catch (err) {
        res.status(500).send("Failed to update todo.");
    }
});

// DELETE request to delete a todo
router.delete("/:user_id/:id", async function (req, res) {
    const { user_id, id } = req.params; // Changed 'userId' to 'user_id'
    const sql = `DELETE FROM todos WHERE id = '${id}' AND user_id = '${user_id}'`; // Template literal
    try {
        const result = await executeQuery(sql);
        if (result.affectedRows > 0) {
            res.status(200).send("Todo deleted successfully.");
        } else {
            res.status(404).send("Todo not found or unauthorized.");
        }
    } catch (err) {
        res.status(500).send("Failed to delete todo.");
    }
});

module.exports = router;
