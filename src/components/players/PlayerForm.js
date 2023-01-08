import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import '../styles/PostForm.css'
import axios from "axios";


function PlayerForm() {

    const [error, setError] = useState("");
    const nagivate = useNavigate();
    const auth = useAuth();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [position, setPosition] = useState("GK");

    const addPlayer = (firstname, lastname, position) => {
        const config = {
            headers: { Authorization: `Bearer ${auth.auth.accessToken}` }
        }

        const newPlayer = {
            "firstname": firstname,
            "lastname": lastname,
            "position": position
        }

        axios.post("http://localhost:8080/players", newPlayer, config)
        .then(response => {
            console.log(`Player added ID: ${response.data.playerId}`);
            nagivate("/success");
        })
        .catch(setError("Incorrect entry."));
    }

    const handleSubmit = e => {
        // required to prevent standard behaviour of submitting
        e.preventDefault();
        addPlayer(firstname, lastname, position);
    }

    const firstnameChanged = e => {
        setFirstname(e.target.value);
    }

    const lastnameChanged = e => {
        setLastname(e.target.value);
    }

    const positionChanged = e => {
        setPosition(e.target.value);
    }

    return (
        <div>
            <div className="title">Add a player</div>
            <form className="form-container"  onSubmit={handleSubmit}>
                <div>
                    <div>Firstname</div>
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Firstname"
                        onChange={firstnameChanged}
                    />
                </div>
                <div>
                    <div>Lastname</div>
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Lastname"
                        onChange={lastnameChanged}
                    />
                </div>
                <div>
                    <div>Position</div>
                    <select name="position" id="position" onChange={positionChanged}>
                        <option value="GK">GK</option>
                        <option value="DF">DF</option>
                        <option value="MF">MF</option>
                        <option value="FW">FW</option>
                    </select>
                </div>
            <div>
                <button className="input-submit">Add</button>
                <div className="error">{error}</div>
            </div>
            </form>
        </div>
    )
}

export default PlayerForm;