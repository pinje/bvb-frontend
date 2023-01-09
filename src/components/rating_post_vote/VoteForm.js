import "../styles/PlayersList.css"
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function VoteForm(props) {

    const [error, setError] = useState("");
    const [ratings, setRatings] = useState([]);

    const auth = useAuth();
    const nagivate = useNavigate();

    const addVote = (ratings) => {
        const config = {
            headers: { Authorization: `Bearer ${auth.auth.accessToken}` }
        }

        ratings.forEach(element => {
            const newRating = {
                "playerId": element[0],
                "rating": element[1],
                "userId": auth?.auth.id,
                "ratingPostId": props.ratingPostId
            }
    
            axios.post("http://localhost:8080/ratings", newRating, config)
            .then(response => {
                console.log(`Rating added ID: ${response.data.ratingId}`);
                nagivate("/success");
            })
            .catch(setError("Incorrect entry."));
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (ratings.length == props.players.length) {
            addVote(ratings);
        } else {
            setError("Incorrect entry.");
        }
    }

    const ratingSelected = (event) => {
        const playerId = event.target.parentElement.parentElement.id;
        const rating = event.target.value;

        const check = ratings.find(element => element[0] === playerId);

        if (!ratings.includes(check)) {
            ratings.push([playerId, rating]);
        } else {
            const index = ratings.indexOf(check);
            ratings.splice(index, 1, [playerId, rating]);
        }

        console.log(ratings);
    }

    return (
        <form className="form-container"  onSubmit={handleSubmit}>
            <table>
                <thead>
                    <tr>
                        <th className="player">Player</th>
                        <th className="position">Position</th>
                        <th className="rating">Rating</th>
                    </tr>
                </thead>
                <tbody>
                {props.players.map(player => {
                    return (
                        <tr id={player.id}>
                            <td>{player.firstname} {player.lastname}</td>
                            <td>{player.position}</td>
                            <td>
                                <select onChange={ratingSelected}>
                                    <option>-</option>
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                </select>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <div>
                <button className="input-submit">Submit</button>
                <div className="error">{error}</div>
            </div>
        </form>
    )
}

export default VoteForm;