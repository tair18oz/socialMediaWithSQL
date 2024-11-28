import React, { createContext, useState } from "react";
import { useNavigate } from "react-router";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  function startUser() {
    if (localStorage.getItem("user") !== "null") {
      return JSON.parse(localStorage.getItem("user"));
    } else return "";
  }
  const [user, setUser] = useState(startUser);

  const setConnectedUserName = (user) => {
    if (!user) return;
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.clear();
    setUser();
  };

  return <UserContext.Provider value={{ connectedUserName: user, setConnectedUserName, logout }}>{children}</UserContext.Provider>;
};
