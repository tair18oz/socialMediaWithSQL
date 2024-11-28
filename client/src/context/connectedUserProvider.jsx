import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  function startUser() {
    if (localStorage.getItem("user") !== "null") {
      return JSON.parse(localStorage.getItem("user"));
    } else return "";
  }
  const [user, setUser] = useState(startUser);

  const setConnectedUserName = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  return <UserContext.Provider value={{ connectedUserName: user, setConnectedUserName }}>{children}</UserContext.Provider>;
};
