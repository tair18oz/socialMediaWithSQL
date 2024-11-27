import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Register({ setConnectedUserName }) {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [error, setError] = useState("");

    const addUser = () => {
        const API_URL_USERS = "http://localhost:3000/user";
        fetch(API_URL_USERS, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                username: userName,
                email: email,
                password: password,
            }),
        })
            .then((response) => {
                if (!response.ok) throw new Error("Failed to create user");
                return response.json();
            })
            .then((data) => {
                localStorage.setItem("currentUser", JSON.stringify({ userName, password, email }));
                setConnectedUserName(userName);
            })
            .catch((error) => {
                setError("Error creating user: " + error.message);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== verifyPassword) {
            setError("Passwords do not match!");
            return;
        }
        fetch(`http://localhost:3000/register?username=${userName}`)
            .then(() => {
                console.log("hi");
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("data: ", data);
                if (data.body.userExist === "true") {
                    setError("Username already exists. Please choose a different username.");
                } else {
                    addUser();
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
                <NavLink to="/login">Login</NavLink>
            </form>
        </div>
    );
}
