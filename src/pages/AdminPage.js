import React, { useState, useEffect } from "react"
import axios from 'axios';
import { Tabs, Tab } from 'react-bootstrap';
import { useAuth } from "../components/context/AuthProvider.js";
import { Navigate, useLocation } from 'react-router-dom';
import RatingPostForm from "../components/rating_post/RatingPostForm.js";

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
                    <div className="title">Team Page</div>
                </div>
                <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
                    <Tab eventKey={"home"} title="Rating Posts History">
                    {key === 'home' && (
                        <div>

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
                    <Tab eventKey={"players"} title="Manage Players">
                    {key === 'players' && (
                        <div>

                        </div>
                    )}
                    </Tab>
                </Tabs>
            </div>
        </div>
    )

}

export default AdminPage;