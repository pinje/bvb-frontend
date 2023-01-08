import React from "react"
import { useAuth } from "../components/context/AuthProvider.js";
import { Navigate, useLocation } from 'react-router-dom';
import PlayerForm from "../components/players/PlayerForm.js";


function AddPlayer() {
    const auth = useAuth();
    const location = useLocation();

    if (!auth?.auth.accessToken) {
        return <Navigate to="/AuthError" state={{ from: location }}></Navigate>
    }

    return (
        <div className="container">
            <div className="inner">
                <PlayerForm/>
            </div>
        </div>
    )

}

export default AddPlayer;