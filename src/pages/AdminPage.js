import React, { useState, useEffect } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Tabs, Tab } from 'react-bootstrap';

function AdminPage() {
    const [key, setKey] = useState('home');

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