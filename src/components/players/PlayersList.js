import "../styles/PlayersList.css"

function PlayersList(props) {
    return (
        <table>
            <thead>
                <tr>
                    <th className="player">Player</th>
                    <th className="position">Position</th>
                    <th className="rating">Average Rating</th>
                </tr>
            </thead>
            <tbody>
            {props.players.map(player => {
                return (
                    <tr id={player.player.id}>
                        <td>{player.player.firstname.charAt(0).toUpperCase() + player.player.firstname.slice(1)} {player.player.lastname.charAt(0).toUpperCase() + player.player.lastname.slice(1)}</td>
                        <td className="position-content">{player.player.position}</td>
                        <td className="rating-content">{player.averageRating}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default PlayersList;