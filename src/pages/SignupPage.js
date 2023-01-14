import React, { useState } from "react"
import axios from 'axios';
import SignupForm from '../components/SignupForm'
import { useNavigate } from "react-router-dom";

function SignupPage() {
    
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const addItem = (username, password) => {
        const newUser = {
            "username": username,
            "password": password
        };

        axios.post("http://localhost:8080/users", newUser)
        .then(response => {
            console.log(`User added ID: ${response.data.id }`);
            navigate("/login");
        })
        .catch(() => setError("Username already exists. Try with another username."))
    }

    return (
        <div className="container">
            <div className="inner">
                <SignupForm addItem={addItem}/>
                <div className="error">{error}</div>
            </div>
        </div>
    )
}

export default SignupPage;