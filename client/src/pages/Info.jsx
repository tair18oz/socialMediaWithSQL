import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/connectedUserProvider";

export default function Info() {
  const { connectedUserName } = useContext(UserContext);
  return (
    <>
      <h1>Info for {connectedUserName}</h1>
    </>
  );
}
