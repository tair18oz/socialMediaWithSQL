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

// POST request to add a new post
router.post("/", async function (req, res) {
    const { user_id, title, content } = req.body; // Changed 'userId' to 'user_id' and 'body' to 'content'
    const sql = `INSERT INTO post (user_id, title, content) VALUES ('${user_id}', '${title}', '${content}')`; // Template literal
    try {
        const result = await executeQuery(sql);
        res.status(201).send({ postId: result.insertId });
    } catch (err) {
        res.status(500).send("Failed to create post.");
    }
});

// GET request to get all post
router.get("/", async function (req, res) {
    const sql = `SELECT * FROM post`;
    try {
        const post = await executeQuery(sql);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).send("Failed to fetch post.");
    }
});

// GET request to get post by user_id
router.get("/:user_id", async function (req, res) {
    const { user_id } = req.params; // Changed 'userid' to 'user_id'
    const sql = `SELECT * FROM post WHERE user_id = '${user_id}'`; // Template literal
    try {
        const posts = await executeQuery(sql);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).send("Failed to fetch post.");
    }
});

// PATCH request to update a post
router.patch("/:user_id/:id", async function (req, res) {
    const { user_id, id } = req.params; // Changed 'userid' to 'user_id'
    const { title, content } = req.body; // Changed 'body' to 'content'
    const sql = `UPDATE post SET title = '${title}', content = '${content}' WHERE user_id = '${user_id}' AND id = '${id}'`; // Template literal
    try {
        const result = await executeQuery(sql);
        if (result.affectedRows > 0) {
            res.status(200).send("Post updated successfully.");
        } else {
            res.status(404).send("Post not found or unauthorized.");
        }
    } catch (err) {
        res.status(500).send("Failed to update post.");
    }
});

// DELETE request to delete a post
router.delete("/:user_id/:id", async function (req, res) {
    const { user_id, id } = req.params; // Changed 'userId' to 'user_id'
    const sql = `DELETE FROM post WHERE id = '${id}' AND user_id = '${user_id}'`; // Template literal
    try {
        const result = await executeQuery(sql);
        if (result.affectedRows > 0) {
            res.status(200).send("Post deleted successfully.");
        } else {
            res.status(404).send("Post not found or unauthorized.");
        }
    } catch (err) {
        res.status(500).send("Failed to delete post.");
    }
});

module.exports = router;
