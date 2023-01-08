import React from "react"
import { useAuth } from "../components/context/AuthProvider.js";
import { Navigate, useLocation } from 'react-router-dom';
import DeletePlayerForm from "../components/players/DeletePlayerForm.js";


function DeletePlayer() {
    const auth = useAuth();
    const location = useLocation();

    if (!auth?.auth.accessToken) {
        return <Navigate to="/AuthError" state={{ from: location }}></Navigate>
    }

    return (
        <div className="container">
            <div className="inner">
                <DeletePlayerForm/>
            </div>
        </div>
    )

}

export default DeletePlayer;