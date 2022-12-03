import React, { useState } from "react"
import axios from 'axios';
import SignupForm from '../components/SignupForm'
import { useNavigate } from "react-router-dom";

function SignupPage() {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const addItem = (username, password) => {
        const newUser = {
            "username": username,
            "password": password
        };

        axios.post("http://localhost:8080/users", newUser)
        .then(response => {
            console.log(`User added ID: ${response.data.id }`);
            navigate("/");
        })
    }

    return (
        <div className="container">
            <div className="inner">
                <SignupForm addItem={addItem}/>
            </div>
        </div>
    )
}

export default SignupPage;