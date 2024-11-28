import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/connectedUserProvider";

export default function Post() {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [postId, setPostId] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const { connectedUserName } = useContext(UserContext);

    const apiUrl = "http://localhost:3000";

    useEffect(() => {
        fetchPosts();
    }, [connectedUserName]);

    const fetchPosts = async () => {
        try {
            const response = await fetch(`${apiUrl}/post/${connectedUserName}`);
            if (!response.ok) throw new Error("Failed to fetch posts");
            const data = await response.json();
            setPosts(data);
        } catch (err) {
            console.error("Error fetching posts:", err);
        }
    };
    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            fetchPosts();
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/post/${connectedUserName}/search?query=${searchQuery}`);
            const data = await response.json();
            setPosts(data);
        } catch (err) {
            console.error("Error searching posts:", err);
        }
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();

        if (!title || !content) {
            alert("Title and content are required");
            return;
        }

        const postData = { title, content };
        try {
            const response = await fetch(`${apiUrl}/post/${connectedUserName}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) throw new Error("Failed to create post");

            const result = await response.json();
            setTitle("");
            setContent("");
            fetchPosts();
        } catch (err) {
            console.error("Error creating post:", err);
        }
    };
    const handleUpdatePost = async (e) => {
        e.preventDefault();

        if (!newTitle || !newContent) {
            alert("Title and content are required for updating");
            return;
        }

        const postData = { title: newTitle, content: newContent };
        try {
            const response = await fetch(`${apiUrl}/post/${connectedUserName}/${postId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) throw new Error("Failed to update post");

            setNewTitle("");
            setNewContent("");
            setPostId("");

            fetchPosts();
        } catch (err) {
            console.error("Error updating post:", err);
        }
    };
    const handleDeletePost = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/post/${connectedUserName}/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to delete post");

            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
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

            <div>
                <h2>Search Posts</h2>
                <input type="text" placeholder="Search by title or content" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <button onClick={handleSearch}>Search</button>
            </div>

            {postId && (
                <form onSubmit={handleUpdatePost}>
                    <h2>Update Post</h2>
                    <input type="text" placeholder="New Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required />
                    <textarea placeholder="New Content" value={newContent} onChange={(e) => setNewContent(e.target.value)} required />
                    <br />
                    <button type="submit">Update Post</button>
                </form>
            )}

            <h2>All Posts</h2>
            <ul>
                {posts.length === 0 ? (
                    <li>No posts available</li>
                ) : (
                    posts.map((post) => (
                        <li key={post.id}>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <button
                                onClick={() => {
                                    setPostId(post.id);
                                    setNewTitle(post.title);
                                    setNewContent(post.content);
                                }}
                            >
                                Edit
                            </button>
                            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                        </li>
                    ))
                )}
            </ul>
        </>
    );
}
