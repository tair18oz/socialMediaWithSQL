import React, { useState, useEffect } from "react";

export default function Info() {
    const [userData, setUserData] = useState({});
    const myusermane = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        fetch(`http://localhost:3000/${myusermane}/info`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setUserData(data);
            })
            .catch((error) => console.error("error", error));
    }, [myusermane]);

    return (
        <>
            <h1>Info</h1>
            <p>
                <strong>Username:</strong> {userData.username}
            </p>
            <p>
                <strong>Email:</strong> {userData.email}
            </p>
        </>
    );
}
