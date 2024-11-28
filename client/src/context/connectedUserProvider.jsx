import React, { createContext, useState } from "react";

// Create the context
export const UserContext = createContext();

// Define the provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const setConnectedUserName = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  return <UserContext.Provider value={{ connectedUserName: user, setConnectedUserName }}>{children}</UserContext.Provider>;
};
