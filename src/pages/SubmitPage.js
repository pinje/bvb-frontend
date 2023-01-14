import React from "react"
import PostForm from "../components/posts/PostForm.js";
import { useAuth } from "../components/context/AuthProvider.js";
import { Navigate, useLocation } from 'react-router-dom';

function SubmitPage() {

    const auth = useAuth();
    const location = useLocation();

    if (!auth?.auth.accessToken) {
        return <Navigate to="/login" state={{ from: location }}></Navigate>
    }

    return (
        <div className="container">
            <div className="inner">
                <PostForm/>
            </div>
        </div>
    )
}

export default SubmitPage;