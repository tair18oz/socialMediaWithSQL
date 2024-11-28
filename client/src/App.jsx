import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from "react-router-dom";
import { UserContext, UserProvider } from "./context/connectedUserProvider";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Info from "./pages/Info";
import Todo from "./pages/Todo";
import Post from "./pages/Post";
import Layout from "./Layout";

function App() {
    const { connectedUserName } = useContext(UserContext);

    return (
        <Router>
            <div>
                {!connectedUserName ? (
                    <>
                        <Routes>
                            <Route path="*" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                    </>
                ) : (
                    <>
                        <Routes>
                            <Route path=":user" element={<Layout />}>
                                <Route path="info" element={<Info />} />
                                <Route path="todos" element={<Todo />} />
                                <Route path="posts" element={<Post />} />
                                <Route path="*" element={<Info />} />
                            </Route>
                        </Routes>
                    </>
                )}
            </div>
        </Router>
    );
}

export default App;
