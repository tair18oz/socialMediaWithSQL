import React, { useContext } from "react";
import { UserContext } from "../context/connectedUserProvider";
import { useNavigate } from "react-router";

function Footer() {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const logOutUser = () => {
    logout();
    navigate("/");
  };

  return (
    <div id="Footer">
      <button id="FooterButton" onClick={logOutUser}>
        log-out
      </button>
    </div>
  );
}
export default Footer;
