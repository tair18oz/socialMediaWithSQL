import React from "react";
import Footer from "./compnent/Footer";
import Header from "./compnent/Header";
import { Outlet } from "react-router-dom";

export default function Layout({ connectedUserName, setConnectedUserName }) {
    return (
        <>
            <Outlet />
            <Header connectedUserName={connectedUserName} setConnectedUserName={setConnectedUserName} id="Header" />
            <Footer connectedUserName={connectedUserName} setConnectedUserName={setConnectedUserName} id="Footer" />
        </>
    );
}
