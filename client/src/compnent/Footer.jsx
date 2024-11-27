import React from "react";
function Footer({ connectedUserName, setConnectedUserName }) {
    const logout = () => {
        setConnectedUserName(false);
        localStorage.clear();
    };
    return (
        <div id="Footer">
            <button id="FooterButton" onClick={logout}>
                log-out
            </button>
        </div>
    );
}
export default Footer;
