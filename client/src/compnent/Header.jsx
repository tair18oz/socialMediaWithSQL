import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header() {
    return (
        <>
            <div id="Header">
                <div id="user-logout"></div>
                <nav className="font">
                    <NavLink to="info">info &nbsp;</NavLink>
                    <NavLink to="posts">posts &nbsp;</NavLink>
                    <NavLink to="todos">todos</NavLink>
                </nav>
            </div>
        </>
    );
}
