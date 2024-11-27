import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Register({ setConnectedUserName }) {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [error, setError] = useState("");

    // Function to add the user after successful registration
    const addUser = () => {
        const API_URL_USERS = "http://localhost:3000/user"; // Ensure this is the correct URL for user creation

        fetch(API_URL_USERS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: userName,
                email: email,
                password: password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("User created:", data);
                localStorage.setItem("currentUser", JSON.stringify({ userName, password, email }));
                setConnectedUserName(userName);
            })
            .catch((error) => {
                setError("Error creating user: " + error.message);
            });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== verifyPassword) {
            setError("Passwords do not match!");
            return;
        }

        // Check if the username is available
        fetch(`http://localhost:3000/register?username=${userName}`)
            .then((response) => response.json()) // Parse the JSON response
            .then((data) => {
                if (data.body.userExist === "true") {
                    setError("Username already exists. Please choose a different username.");
                } else {
                    addUser(); // Call addUser function if username is available
                }
            })
            .catch((error) => {
                setError("Fetch error: " + error.message);
            });
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label>Verify Password</label>
                    <input type="password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} required />
                </div>
                <button type="submit">Register</button>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <NavLink to="/login">Login</NavLink>
            </form>
        </div>
    );
}
