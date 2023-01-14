import styles from "../styles/PlayersList.module.css"

function PlayersList(props) {
    return (
        <table>
            <thead>
                <tr>
                    <th className={styles.player}>Player</th>
                    <th className={styles.position}>Position</th>
                    <th className={styles.rating}>Average Rating</th>
                </tr>
            </thead>
            <tbody>
            {props.players.map(player => {
                return (
                    <tr id={player.player.id}>
                        <td className={styles.playercontent}>{player.player.firstname.charAt(0).toUpperCase() + player.player.firstname.slice(1)} {player.player.lastname.charAt(0).toUpperCase() + player.player.lastname.slice(1)}</td>
                        <td className={styles.positioncontent}>{player.player.position}</td>
                        <td className={styles.ratingcontent}>{player.averageRating}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default PlayersList;