import "../styles/PlayerSelection.css"
import { useState, useEffect } from "react";

function PlayersManagementList(props) {

    useEffect(() => {

      }, []);

    return (
        <div>
            {props.players.map(player => {
                return (
                    <div className="player" id={player.player.id}>
                        <td>{player.player.firstname} {player.player.lastname}</td>
                    </div>
                )
            })}
        </div>
    )
}

export default PlayersManagementList;