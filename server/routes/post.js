var express = require("express");
var router = express.Router();
const { con } = require("../con");
const util = require("util");
const query = util.promisify(con.query).bind(con);

// Function to execute SQL queries with error handling
const executeQuery = async (sql) => {
    try {
        const result = await query(sql);
        return result;
    } catch (err) {
        console.error("Database query failed: ", err);
        throw err;
    }
};

// POST request to add a new post (with userName as URL parameter)
router.post("/:userName/post", async function (req, res) {
    const { userName } = req.params; // Extracting userName from the URL parameter
    console.log("userName: ", userName);
    const { user_id, title, content } = req.body; // Extracting title and content from the body

    // Make sure that title and content are provided
    if (!user_id || !title || !content) {
        return res.status(400).json({ error: "Title and content are required." });
    }

    // SQL query to insert the new post
    const sql = `
        INSERT INTO post (user_id, title, content) 
        VALUES (
            (SELECT id FROM user WHERE username = '${userName}'), 
            '${title}', 
            '${content}'
            '${user_id}'
        )
    `;

    try {
        // Execute the query
        const result = await executeQuery(sql);

        // Respond with the created post ID
        res.status(201).json({ postId: result.insertId });
    } catch (err) {
        console.error("Error inserting post:", err);
        res.status(500).json({ error: "Failed to create post." });
    }
});

// GET request to get all posts
router.get("/", async function (req, res) {
    const sql = `SELECT * FROM post`;
    try {
        const posts = await executeQuery(sql);
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).send("Failed to fetch posts.");
    }
});

// GET request to get post by userName
router.get("/:userName", async function (req, res) {
    const { userName } = req.params;
    const sql = `SELECT * FROM post WHERE user_id = (SELECT id FROM user WHERE username = '${userName}')`;

    try {
        const posts = await executeQuery(sql);
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).send("Failed to fetch posts.");
    }
});

// PATCH request to update a post by userName and post id
router.patch("/:userName/:id", async function (req, res) {
    const { userName, id } = req.params;
    const { title, content } = req.body;

    // SQL query to update the post
    const sql = `
        UPDATE post 
        SET title = '${title}', content = '${content}' 
        WHERE user_id = (SELECT id FROM user WHERE username = '${userName}') 
        AND id = ${id}
    `;
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

// DELETE request to delete a post by userName and post id
router.delete("/:userName/:id", async function (req, res) {
    const { userName, id } = req.params;

    // SQL query to delete the post
    const sql = `
        DELETE FROM post 
        WHERE id = ${id} 
        AND user_id = (SELECT id FROM user WHERE username = '${userName}')
    `;

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
