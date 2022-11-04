import React, { useState, useEffect } from "react"
import axios from 'axios';
import UsersList from '../components/UsersList.js';
import SignupForm from '../components/SignupForm'

function SignupPage() {

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

    const addItem = (username, password) => {
        const newUser = {
            "username": username,
            "password": password
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
                <SignupForm addItem={addItem}/>
                <UsersList users={users} />
            </div>
        </div>
    )
}

export default SignupPage;