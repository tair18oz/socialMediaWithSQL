import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/connectedUserProvider";

export default function Register() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [error, setError] = useState("");
    const [uniqueName, setUniqueName] = useState(false);
    const Nav = useNavigate();
    const { setConnectedUserName } = useContext(UserContext);

    // Function to add the user after successful registration
    const handleSubmit = (e) => {
        e.preventDefault();
        const API_URL_USERS = "http://localhost:3000/register";
        if (uniqueName) {
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
                .then((response) => response.text())
                .then((data) => {
                    debugger;
                    console.log("User created:");
                    localStorage.setItem("currentUser", userName);
                    setConnectedUserName(userName);
                    Nav(`/${data.username}/info`);
                })
                .catch((error) => {
                    setError(error.message);
                });
        } else {
            alert("username is take, please choose a different unique username");
        }
    };

    const handleUsername = (e) => {
        e.preventDefault();

        if (password !== verifyPassword) {
            setError("Passwords do not match!");
            return;
        }

        fetch(`http://localhost:3000/register/?username=${userName}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.body.userExist === "true") {
                    alert("username is taken, please choose a different unique username");
                } else {
                    setUniqueName(true);
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
                    <input type="text" value={userName} onBlur={handleUsername} onChange={(e) => setUserName(e.target.value)} required />
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
