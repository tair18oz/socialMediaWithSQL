import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/connectedUserProvider";

export default function Info() {
  const [userData, setUserData] = useState({});
  // const myusermane = JSON.parse(localStorage.getItem("user"))
  const { connectedUserName } = useContext(UserContext);

  function getInfo() {
    console.log("went to fetch some info");
    fetch(`http://localhost:3000/info/?user=${connectedUserName}`)
      .then((response) => {
        if (response.status !== 200) {
          console.log("something went wrong");
          return;
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
      });
  }

  useEffect(() => {
    getInfo();
  }, [connectedUserName]);

  return (
    <>
      <h1>Info for {connectedUserName}</h1>
      <p>
        <strong>Username:</strong> {userData.username}
      </p>
      <p>
        <strong>Email:</strong> {userData.email}
      </p>
    </>
  );
}
