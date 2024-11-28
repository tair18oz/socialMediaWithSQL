import React, { useContext } from "react";
import { UserContext } from "../context/connectedUserProvider";

function Footer() {
  const { setConnectedUserName } = useContext(UserContext);

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
