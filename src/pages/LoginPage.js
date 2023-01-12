import React, { useState } from "react"
import axios from 'axios'
import LoginForm from '../components/LoginForm.js'
import { useNavigate } from "react-router"
import jwt_decode from 'jwt-decode'
import { useAuth } from "../components/context/AuthProvider.js"


function LoginPage() {

    const { saveAuth } = useAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const addItem = async (username, password) => {

        const login = {
            "username": username,
            "password": password
        };

        await axios.post("http://localhost:8080/login", login)
            .then(response => {
                const token = response?.data?.accessToken;
                const payload = jwt_decode(token);
                if (payload instanceof Object) {

                    let newAuth = {
                        id: payload.userId.toString(),
                        roles: payload.roles.toString(),
                        accessToken: token
                    };
                    
                    saveAuth(newAuth);
                    navigate("/");
                }
            })
            .catch(() => setError("Incorrect username or password."));
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