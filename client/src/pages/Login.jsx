import React, { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";

export default function Login() {
  const Nav = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
        // update general state
        // Redirect to home page
      })
      .catch((error) => {
        if (error.message.includes("401")) {
          setError("Invalid credentials. Please try again.");
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
      });

    // fetch("http://localhost:3000/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ name: userName, password: password }),
    // })
    //   .catch((error) => {
    //     console.error("Error:", error.message);
    //   });
    //   .then((response) => console.log(response))
    //   .then((response) => response.json()) // send response body to next then chain
    //   .then((body) => console.log(body));
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
