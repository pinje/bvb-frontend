import styles from "../styles/VoteForm.module.css"
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
            .catch(() => setError("Incorrect entry."));
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
        <form onSubmit={handleSubmit}>
            <div className={styles.ratingbox}>
                <table>
                    <thead>
                        <tr>
                            <th className={styles.player}>Player</th>
                            <th className={styles.position}>Position</th>
                            <th className={styles.rating}>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                    {props.players.map(player => {
                        return (
                            <tr id={player.id}>
                                <td>{player.firstname.charAt(0).toUpperCase() + player.firstname.slice(1)} {player.lastname.charAt(0).toUpperCase() + player.lastname.slice(1)}</td>
                                <td className={styles.position}>{player.position}</td>
                                <td className={styles.position}>
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
                <div className={styles.legend}>
                    <table>
                        <thead>
                            <tr>
                                <th>Rating</th>
                                <th>Performance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>10</td>
                                <td>Perfect</td>
                            </tr>
                            <tr>
                                <td>9</td>
                                <td>Outstanding</td>
                            </tr>
                            <tr>
                                <td>8</td>
                                <td>Very good</td>
                            </tr>
                            <tr>
                                <td>7</td>
                                <td>Good</td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>Satisfactory</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>OK</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Unsatisfactory</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Bad</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Very bad</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Unbelievably bad</td>
                            </tr>
                            <tr>
                                <td>0</td>
                                <td>Unacceptable behavior</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={styles.submitbox}>
                <button className={styles.submit}>Submit</button>
                <div className="error">{error}</div>
            </div>
        </form>
    )
}

export default VoteForm;