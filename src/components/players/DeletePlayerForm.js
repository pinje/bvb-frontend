import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import '../styles/PostForm.css'
import axios from "axios";


function DeletePlayerForm() {

    const [error, setError] = useState("");
    const nagivate = useNavigate();
    const auth = useAuth();

    const [selectedPlayerId, setSelectedPlayerId] = useState("");
    const [playersList, setPlayersList] = useState([]);

    const deletePlayer = (selectedPlayerId) => {
        const config = {
            headers: { Authorization: `Bearer ${auth.auth.accessToken}` }
        }

        axios.delete("http://localhost:8080/players/" + selectedPlayerId, config)
        .then(response => {
            console.log(`Player deleted ID: ${selectedPlayerId}`);
            nagivate("/success");
        })
        .catch(setError("Incorrect entry."));
    }

    const handleSubmit = e => {
        // required to prevent standard behaviour of submitting
        e.preventDefault();
        deletePlayer(selectedPlayerId);
    }

    const playerSelected = e => {
        setSelectedPlayerId(e.target.value);
    }

    const getPlayers = () => {
        axios.get("http://localhost:8080/players")
        .then(response => {
            setPlayersList(response.data.players);
            console.log(response.data.players);
        })
        .catch(error => console.log(error));
    }

    useEffect(() => {
        getPlayers();
      }, []);

    return (
        <div>
            <div className="title">Delete a player</div>
            <form className="form-container"  onSubmit={handleSubmit}>
                <div>
                    <select name="player" id="player" onChange={playerSelected}>
                    <option value="-">-</option>
                    {playersList.map(player => {
                        return (
                            <option value={player.id}>
                                {player.firstname} {player.lastname}
                            </option>
                        )
                    })}
                    </select>
                </div>
                <div>
                    <button className="input-submit">Delete</button>
                    <div className="error">{error}</div>
                </div>
            </form>
        </div>
    )
}

export default DeletePlayerForm;