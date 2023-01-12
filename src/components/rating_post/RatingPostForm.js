import { useState, useEffect } from "react";
import PlayerSelection from "./PlayerSelection";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import "../styles/RatingPostForm.css"
import { useNavigate } from "react-router-dom";

function RatingPostForm() {

    const auth = useAuth();
    const [error, setError] = useState("");
    const nagivate = useNavigate();

    const [startYear, setStartYear] = useState("");
    const [endYear, setEndYear] = useState("");
    const [matchday, setMatchday] = useState("");
    const [opponent, setOpponent] = useState("");
    const [tournament, setTournament] = useState("BUNDESLIGA");
    const [selectedPlayersId, setSelectedPlayersId] = useState([]);

    const [FWplayers, setFWPlayers] = useState([]);
    const [MFplayers, setMFPlayers] = useState([]);
    const [DFplayers, setDFPlayers] = useState([]);
    const [GKplayers, setGKPlayers] = useState([]);

    const [selectedFWplayers, setSelectedFWPlayers] = useState([]);
    const [selectedMFplayers, setSelectedMFPlayers] = useState([]);
    const [selectedDFplayers, setSelectedDFPlayers] = useState([]);
    const [selectedGKplayers, setSelectedGKPlayers] = useState([]);

    const addRatingPost = (startYear, endYear, matchday, opponent, tournament, selectedPlayersId) => {
        const config = {
            headers: { Authorization: `Bearer ${auth.auth.accessToken}` }
        }

        const newRatingPost = {
            "start_year": startYear,
            "end_year": endYear,
            "matchday": matchday,
            "opponent": opponent,
            "tournament": tournament,
            "playersId": selectedPlayersId
        }

        axios.post("http://localhost:8080/ratingposts", newRatingPost, config)
        .then(response => {
            console.log(`Rating Post added ID: ${response.data.ratingPostId}`);
            nagivate("/success");
        })
        .catch(() => setError("Incorrect entry."));
    }

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

    const handleSubmit = e => {
        // required to prevent standard behaviour of submitting
        e.preventDefault();
        const players = selectedPlayersId.concat(selectedFWplayers, selectedMFplayers, selectedDFplayers, selectedGKplayers);
        addRatingPost(startYear, endYear, matchday, opponent, tournament, players);
    }

    const startYearChanged = e => {
        setStartYear(e.target.value)
    }

    const endYearChanged = e => {
        setEndYear(e.target.value)
    }

    const matchdayChanged = e => {
        setMatchday(e.target.value)
    }

    const opponentChanged = e => {
        setOpponent(e.target.value)
    }

    const tournamentChanged = e => {
        setTournament(e.target.value)
    }

    const playerSelectionChanged = (position, selectedPlayers) => {
        switch (position) {
          case 'GK':
            setSelectedGKPlayers(selectedPlayers);
            break;
          case 'DF':
            setSelectedDFPlayers(selectedPlayers);
            break;
          case 'MF':
            setSelectedMFPlayers(selectedPlayers);
            break;
          case 'FW':
            setSelectedFWPlayers(selectedPlayers);
            break;
          default:
            break;
        }
      }

    useEffect(() => {
        getPlayersByFW();
        getPlayersByMF();
        getPlayersByDF();
        getPlayersByGK();
      }, []);

    return (
        <div className="rating-post-form">
            <div className="title">Create a rating post</div>
            <form className="form-container"  onSubmit={handleSubmit}>
                <div className="section seasondate">
                    <div>
                        <div className="section-title">Season start year</div>
                        <input
                            type="text"
                            className="input-text"
                            placeholder="Start Year"
                            onChange={startYearChanged}
                        />
                    </div>
                    <div>
                        <div className="section-title">Season end year</div>
                        <input
                            type="text"
                            className="input-text"
                            placeholder="End Year"
                            onChange={endYearChanged}
                        />
                    </div>
                </div>
                <div className="section">
                    <div className="section-title">Matchday</div>
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Matchday (enter 0 if not applicable)"
                        onChange={matchdayChanged}
                    />
                </div>
                <div className="section">
                    <div className="section-title">Opponent</div>
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Opponent (Team name)"
                        onChange={opponentChanged}
                    />
                </div>
                <div className="section">
                    <div className="section-title">Tournament</div>
                    <select name="tournament" id="tournament" onChange={tournamentChanged}>
                        <option value="BUNDESLIGA">Bundesliga</option>
                        <option value="CHAMPIONS_LEAGUE">Champions League</option>
                        <option value="EUROPA_LEAGUE">Europa League</option>
                        <option value="CONFERENCE_LEAGUE">Conference League</option>
                        <option value="DFB_CUP">DFB Pokal</option>
                        <option value="FRIENDLY">Friendly</option>
                    </select>
                </div>
                <div className="section">
                    <div className="section-title">Select Players</div>
                    <div className="section-position-title">Goalkeepers</div>
                    <PlayerSelection players={GKplayers} onChange={(selectedPlayers) => playerSelectionChanged('GK', selectedPlayers)} />
                    <div className="section-position-title">Defenders</div>
                    <PlayerSelection players={DFplayers} onChange={(selectedPlayers) => playerSelectionChanged('DF', selectedPlayers)} />
                    <div className="section-position-title">Midfielders</div>
                    <PlayerSelection players={MFplayers} onChange={(selectedPlayers) => playerSelectionChanged('MF', selectedPlayers)} />
                    <div className="section-position-title">Forwards</div>
                    <PlayerSelection players={FWplayers} onChange={(selectedPlayers) => playerSelectionChanged('FW', selectedPlayers)} />
                </div>
            <div>
                <button className="input-submit">Create Rating Post</button>
                <div className="error">{error}</div>
            </div>
            </form>
        </div>
    )

}

export default RatingPostForm;