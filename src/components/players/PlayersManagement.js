import PlayersManagementList from "./PlayersManagementList";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/RatingPostForm.css"
import { useNavigate } from "react-router-dom";

function PlayersManagement() {

    const navigate = useNavigate();

    const [FWplayers, setFWPlayers] = useState([]);
    const [MFplayers, setMFPlayers] = useState([]);
    const [DFplayers, setDFPlayers] = useState([]);
    const [GKplayers, setGKPlayers] = useState([]);

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
        getPlayersByFW();
        getPlayersByMF();
        getPlayersByDF();
        getPlayersByGK();
      }, []);


    return (
        <div>
            <div className="add-post-button">
                <button className="add-post" onClick={() => navigate("/addplayer")}>
                    <div className="plus-button">+</div>
                    <div>Add Player</div>
                </button>
            </div><div className="add-post-button">
                <button className="add-post" onClick={() => navigate("/deleteplayer")}>
                    <div className="plus-button">+</div>
                    <div>Delete Player</div>
                </button>
            </div>
            <div>Squad List</div>
            <div>GK</div>
            <PlayersManagementList players={GKplayers} />
            <div>DF</div>
            <PlayersManagementList players={DFplayers} />
            <div>MF</div>
            <PlayersManagementList players={MFplayers} />
            <div>FW</div>
            <PlayersManagementList players={FWplayers} />
        </div>
    )
}

export default PlayersManagement;