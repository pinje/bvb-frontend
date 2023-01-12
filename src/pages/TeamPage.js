import React, { useState, useEffect } from "react"
import axios from 'axios';
import PlayersList from "../components/players/PlayersList";
import { useNavigate } from "react-router-dom";
import { Tabs, Tab } from 'react-bootstrap';

function TeamPage() {
    const [players, setPlayers] = useState([]);
    const [FWplayers, setFWPlayers] = useState([]);
    const [MFplayers, setMFPlayers] = useState([]);
    const [DFplayers, setDFPlayers] = useState([]);
    const [GKplayers, setGKPlayers] = useState([]);
    const [key, setKey] = useState('home');
    const navigate = useNavigate();

    const getPlayers = () => {
        axios.get("http://localhost:8080/ratings/average")
        .then(response => {
            setPlayers(response.data.averageRatings);
        })
        .catch(error => console.log(error));
    };

    const getPlayersByFW = () => {
        axios.get("http://localhost:8080/ratings/average_position", {
            params: {
                "position": "FW"
            }
        })
        .then(response => {
            setFWPlayers(response.data.averageRatings);
        })
        .catch(error => console.log(error));
    }

    const getPlayersByMF = () => {
        axios.get("http://localhost:8080/ratings/average_position", {
            params: {
                "position": "MF"
            }
        })
        .then(response => {
            setMFPlayers(response.data.averageRatings);
        })
        .catch(error => console.log(error));
    }

    const getPlayersByDF = () => {
        axios.get("http://localhost:8080/ratings/average_position", {
            params: {
                "position": "DF"
            }
        })
        .then(response => {
            setDFPlayers(response.data.averageRatings);
            console.log(response.data);
        })
        .catch(error => console.log(error));
    }

    const getPlayersByGK = () => {
        axios.get("http://localhost:8080/ratings/average_position", {
            params: {
                "position": "GK"
            }
        })
        .then(response => {
            setGKPlayers(response.data.averageRatings);
        })
        .catch(error => console.log(error));
    }

    useEffect(() => {
        getPlayers();
        getPlayersByFW();
        getPlayersByMF();
        getPlayersByDF();
        getPlayersByGK();
      }, []);

    return (
        <div className="container">
            <div className="inner">
                <div className="title-box">
                    <div className="page-title">Team Page</div>
                </div>
                <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
                    <Tab 
                        eventKey={"home"} 
                        title="Squad List sort by average rating"
                    >
                    {key === 'home' && (
                        <div className="post-list">
                            <PlayersList players={players} />
                        </div>
                    )}
                    </Tab>
                    <Tab eventKey={"position"} title="Squad List sort by position">
                    {key === 'position' && (
                        <div>
                            <div className="position-box">
                                <div className="position-title">Goalkeepers</div>
                                <div className="post-list">
                                    <PlayersList players={GKplayers} />
                                </div>
                            </div>
                            <div className="position-box">
                                <div className="position-title">Defenders</div>
                                <div className="post-list">
                                    <PlayersList players={DFplayers} />
                                </div>
                            </div>
                            <div className="position-box">
                                <div className="position-title">Midfielders</div>
                                <div className="post-list">
                                    <PlayersList players={MFplayers} />
                                </div>
                            </div>
                            <div className="position-box">
                                <div className="position-title">Forwards</div>
                                <div className="post-list">
                                    <PlayersList players={FWplayers} />
                                </div>
                            </div>
                        </div>
                    )}
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}

export default TeamPage;