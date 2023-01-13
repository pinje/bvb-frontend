import React, { useState } from "react"
import { Tabs, Tab } from 'react-bootstrap';
import { useAuth } from "../components/context/AuthProvider.js";
import { Navigate, useLocation } from 'react-router-dom';
import RatingPostForm from "../components/rating_post/RatingPostForm.js";
import PlayersManagement from "../components/players/PlayersManagement.js";

function AdminPage() {
    const auth = useAuth();
    const location = useLocation();

    const [key, setKey] = useState('home');

    const role = auth?.auth.roles;

    if (role !== "ADMIN") {
        return <Navigate to="/AuthError" state={{ from: location }}></Navigate>
    }

    return (
        <div className="container">
            <div className="inner">
                <div className="title-box">
                    <div className="page-title">Admin Page</div>
                </div>
                <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
                    <Tab eventKey={"home"} title="Manage Players">
                        {key === 'home' && (
                            <div>
                                <PlayersManagement/>
                            </div>
                        )}
                    </Tab>
                    <Tab eventKey={"ratingpost"} title="Create Rating Post">
                        {key === 'ratingpost' && (
                            <div>
                                <RatingPostForm/>
                            </div>
                        )}
                    </Tab>
                </Tabs>
            </div>
        </div>
    )

}

export default AdminPage;