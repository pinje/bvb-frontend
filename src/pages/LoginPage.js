import React, { useState } from "react"
import axios from 'axios';
import LoginForm from '../components/LoginForm.js'
import { useNavigate } from "react-router";
import jwt_decode from 'jwt-decode';

function LoginPage() {

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const addItem = async (username, password) => {

        const login = {
            "username": username,
            "password": password
        };
        
        await axios.post("http://localhost:8080/login", login)
            .then(response => {
                const token = response.data.accessToken;
                const payload = jwt_decode(token);
                if (payload instanceof Object) {
                    window.sessionStorage.setItem("userId", payload.userId.toString());
                    console.log(window.sessionStorage.getItem("userId"));
                    window.sessionStorage.setItem("accessToken", token);
                    console.log(window.sessionStorage.getItem("accessToken"));
                    navigate("/");
                }
            })
            .catch(setError("Incorrect username or password."));
    }

    return (
        <div className="container">
            <div className="inner">
                <LoginForm addItem={addItem}/>
                <div className="error">{error}</div>
            </div>
        </div>
    )
}

export default LoginPage;