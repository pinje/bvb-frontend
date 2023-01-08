import "../styles/PlayerSelection.css"
import { useState, useEffect } from "react";

function PlayerSelection(props) {
    
    const [selectedPlayers, setSelectedPlayers] = useState([]);

    const handleChange = (event) => {

        const playerId = event.target.dataset.playerId;
        const isChecked = event.target.checked;

        if (isChecked) {
            if (!selectedPlayers.includes(playerId)) {
                selectedPlayers.push(playerId);
            }
        } else {
            const index = selectedPlayers.indexOf(playerId);
            selectedPlayers.splice(index, 1);
        }
        
        props.onChange(selectedPlayers);
    }

    useEffect(() => {

      }, [selectedPlayers]);

    return (
        <div>
            {props.players.map(player => {
                return (
                    <div className="player">
                        <input type="checkbox" data-player-id={player.player.id} onChange={handleChange} />
                        <td>{player.player.firstname} {player.player.lastname}</td>
                    </div>
                )
            })}
        </div>
    )
}

export default PlayerSelection;