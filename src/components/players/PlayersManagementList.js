import styles from "../styles/PlayersManagementList.module.css"
import { useEffect } from "react";

function PlayersManagementList(props) {

    useEffect(() => {

      }, []);

    return (
        <div>
            {props.players.map(player => {
                return (
                    <div className={styles.player} id={player.player.id}>
                        <td>{player.player.firstname.charAt(0).toUpperCase() + player.player.firstname.slice(1)} {player.player.lastname.charAt(0).toUpperCase() + player.player.lastname.slice(1)}</td>
                    </div>
                )
            })}
        </div>
    )
}

export default PlayersManagementList;