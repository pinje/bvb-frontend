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
                        <td>{player.player.firstname} {player.player.lastname}</td>
                        <td>{player.player.position}</td>
                        <td>{player.averageRating}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default PlayersList;