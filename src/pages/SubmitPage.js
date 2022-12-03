import React, { useState, useEffect } from "react"
import axios from 'axios';
import PostForm from "../components/posts/PostForm.js";

function SubmitPage() {

    const [users, setUsers] = useState([]);

    const addItem = (username, password) => {
        const newUser = {
            "username": username,
            "password": password
        };

        axios.post("http://localhost:8080/users", newUser)
        .then(response => {
            console.log(`User added ID: ${response.data.id }`);
        })
    }

    return (
        <div className="container">
            <div className="inner">
                <PostForm addItem={addItem}/>
            </div>
        </div>
    )
}

export default SubmitPage;