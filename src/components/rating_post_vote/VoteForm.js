import "../styles/PlayersList.css"
import { useState, useEffect } from "react";

function VoteForm(props) {

    const [error, setError] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
    }

    const ratingSelected = () => {

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