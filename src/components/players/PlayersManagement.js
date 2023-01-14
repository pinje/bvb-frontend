import PlayersManagementList from "./PlayersManagementList";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/PlayersManagement.module.css"
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
            <div className={styles.buttonbox}>
                <button className={styles.button} onClick={() => navigate("/addplayer")}>
                    <div className={styles.plus}>+</div>
                    <div>Add Player</div>
                </button>
                <button className={styles.button} onClick={() => navigate("/deleteplayer")}>
                    <div className={styles.plus}>-</div>
                    <div>Delete Player</div>
                </button>
            </div>
            <div className={styles.title}>Goalkeepers</div>
            <PlayersManagementList players={GKplayers} />
            <div className={styles.title}>Defenders</div>
            <PlayersManagementList players={DFplayers} />
            <div className={styles.title}>Midfielders</div>
            <PlayersManagementList players={MFplayers} />
            <div className={styles.title}>Forwards</div>
            <PlayersManagementList players={FWplayers} />
        </div>
    )
}

export default PlayersManagement;