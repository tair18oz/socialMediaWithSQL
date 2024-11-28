import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/connectedUserProvider";

export default function Post() {
    const [posts, setPosts] = useState([]);
    const [userName, setUserName] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [postId, setPostId] = useState("");
    const { connectedUserName } = useContext(UserContext);
    const apiUrl = "http://localhost:3000";

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch(`${apiUrl}/${connectedUserName}`);
                const data = await response.json();
                setPosts(data);
            } catch (err) {
                console.error("Error fetching posts:", err);
            }
        }

        fetchPosts();
    }, []);

    const getPostsByUserName = async (connectedUserName) => {
        try {
            const response = await fetch(`${apiUrl}/${connectedUserName}`);
            const data = await response.json();
            setPosts(data);
        } catch (err) {
            console.error("Error fetching posts for user:", err);
        }
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();

        const postData = {
            user_id: userName,
            title: title,
            content: content,
        };

        try {
            const response = await fetch(`${apiUrl}/${connectedUserName}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            const result = await response.json();
            console.log("Post created:", result);
            fetchPosts();
        } catch (err) {
            console.error("Error creating post:", err);
        }
    };

    const handleUpdatePost = async (e) => {
        e.preventDefault();

        const postData = {
            title: newTitle,
            content: newContent,
        };

        try {
            const response = await fetch(`${apiUrl}/${connectedUserName}/${postId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            const result = await response.json();
            console.log("Post updated:", result);
            fetchPosts();
        } catch (err) {
            console.error("Error updating post:", err);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            const response = await fetch(`${apiUrl}/${connectedUserName}/${postId}`, {
                method: "DELETE",
            });

            const result = await response.json();
            console.log("Post deleted:", result);
            setPosts(posts.filter((post) => post.id !== postId));
        } catch (err) {
            console.error("Error deleting post:", err);
        }
    };

    return (
        <>
            <h1>Post</h1>

            <form onSubmit={handleCreatePost}>
                <h2>Create a new post</h2>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
                <br />
                <button type="submit">Create Post</button>
            </form>

            <form onSubmit={handleUpdatePost}>
                <h2>Update a post</h2>
                <input type="text" placeholder="New Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required />
                <textarea placeholder="New Content" value={newContent} onChange={(e) => setNewContent(e.target.value)} required />
                <br />

                <button type="submit">Update Post</button>
            </form>

            <h2>All Posts</h2>
            <ul>
                {posts.length === 0 ? (
                    <li>No posts available</li>
                ) : (
                    posts.map((post) => (
                        <li key={post.id}>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                        </li>
                    ))
                )}
            </ul>
        </>
    );
}
