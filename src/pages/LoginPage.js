import React, { useState, useEffect } from "react"
import axios from 'axios';
import InputItem from '../components/InputItem.js';
import LoginForm from '../components/LoginForm.js'

function LoginPage() {

    const [users, setUsers] = useState([]);
    
    const refreshUsersList = () => {
        axios.get("http://localhost:8080/users")
        .then(response => {
            setUsers(response.data.users);
        })
        .catch(error => console.log(error));
    };

    useEffect(() => {
        refreshUsersList();
      }, []);

    const addItem = username => {
        const newUser = {
            "username": username
        };
        axios.post("http://localhost:8080/users", newUser)
        .then(response => {
            console.log(`User added ID: ${response.data.id }`);
            refreshUsersList();
        })
    }

    return (
        <div className="container">
            <div className="inner">
                <LoginForm addItem={addItem}/>
            </div>
        </div>
    )
}

export default LoginPage;