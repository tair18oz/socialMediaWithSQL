import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Info from "./pages/Info";
import Todo from "./pages/Todo";
import Post from "./pages/Post";
import Layout from "./Layout";

function App() {
    const [connectedUserName, setConnectedUserName] = useState("");

    return (
        <Router>
            <div>
                {!connectedUserName ? (
                    <>
                        <Routes>
                            <Route path="*" element={<Login connectedUserName={connectedUserName} setConnectedUserName={setConnectedUserName} />} />
                            <Route
                                path="/register"
                                element={<Register connectedUserName={connectedUserName} setConnectedUserName={setConnectedUserName} />}
                            />
                        </Routes>
                    </>
                ) : (
                    <>
                        <Routes>
                            <Route path="/" element={<Layout connectedUserName={connectedUserName} setConnectedUserName={setConnectedUserName} />}>
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
