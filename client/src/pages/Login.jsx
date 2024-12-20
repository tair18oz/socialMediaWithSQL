import React, { useContext, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/connectedUserProvider";

export default function Login() {
    const Nav = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setConnectedUserName } = useContext(UserContext);

    function handleSubmit(e) {
        e.preventDefault();
        if (!userName || !password || password.length < 5) {
            setError("Invalid input. Ensure all fields are filled and the password is at least 5 characters long.");
            return;
        }

        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: userName, password: password }),
        })
            .then((response) => {
                if (response.status === 401) {
                    alert("Wrong username or password");
                    throw new Error("Unauthorized (401)");
                }
                if (response.status === 200) {
                    return response.json();
                }
                throw new Error("HTTP error! Status: " + response.status);
            })
            .then((data) => {
                localStorage.setItem("user", JSON.stringify(data.username));
                setConnectedUserName(data.username);
                Nav(`/${data.username}/info`);
            })
            .catch((error) => {
                if (error.message.includes("401")) {
                    setError("Invalid credentials. Please try again.");
                } else {
                    setError("An unexpected error occurred. Please try again later.");
                }
            });
    }

    {
        return (
            <>
                <div>
                    <h2>login</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Username</label>
                            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                        </div>

                        <div>
                            <label>Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>

                        <button type="submit">log in</button>
                        <NavLink to="/register">don't have an account yet? Register here</NavLink>
                    </form>
                </div>
            </>
        );
    }
}
