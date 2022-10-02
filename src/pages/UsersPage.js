import React, { useState, useEffect } from "react"
import InputItem from '../components/InputItem.js';
import UsersList from '../components/UsersList.js';
import axios from 'axios';

function UsersPage() {

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
                <InputItem addItem={addItem} />
                <UsersList users={users} />
            </div>
        </div>
    )
}

export default UsersPage;