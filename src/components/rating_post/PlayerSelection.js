import "../styles/PlayerSelection.css"
import { useState } from "react";

function PlayerSelection(props) {
    
    const [selectedPlayers, setSelectedPlayers] = useState([]);

    const handleChange = (event) => {
        const playerId = event.target.id;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedPlayers([...selectedPlayers, playerId]);
        } else {
            setSelectedPlayers(selectedPlayers.filter((id) => id !== playerId));
        }
    }


    return (
        <div>
            {props.players.map(player => {
                return (
                    <div id={player.player.id} className="player">
                        <input type="checkbox" id={player.player.id} onChange={handleChange} />
                        <td>{player.player.firstname} {player.player.lastname}</td>
                    </div>
                )
            })}
        </div>
    )
}

export default PlayerSelection;