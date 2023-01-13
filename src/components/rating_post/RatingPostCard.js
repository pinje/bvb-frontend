import { NavLink } from "react-router-dom";
import moment from 'moment'
import '../styles/RatingPostCard.css'

function RatingPostCard(props) {

    function getTime() {
        const date = props.ratingPost.date;
        const dateFormatted = moment(date);
        const now = moment().format();

        const difference = moment.duration(moment(now).diff(moment(dateFormatted)));

        return (
            difference.humanize()
        )
    }

    function tournamentName(tournament) {
        if (tournament == "BUNDESLIGA") {
            return (
                <div className="bundesliga">Bundesliga</div>
            )
        } else if (tournament == "CHAMPIONS_LEAGUE") {
            return (
                <div className="champions">Champions League</div>
            )
        } else if (tournament == "EUROPA_LEAGUE") {
            return (
                <div className="europa">Europa League</div>
            )
        } else if (tournament == "CONFERENCE_LEAGUE") {
            return (
                <div className="conference">Conference League</div>
            )
        } else if (tournament == "DFB_CUP") {
            return (
                <div className="pokal">DFB Pokal</div>
            )
        } else if (tournament == "FRIENDLY") {
            return (
                <div className="friendly">Friendly</div>
            )
        }
    }

    return (
        <div className="post">
            <div className="post-box">
                <div className="author">posted @ {getTime()} ago</div>
                <div className="title">{tournamentName(props.ratingPost.tournament)} <span className="opponent"> vs {props.ratingPost.opponent}</span></div>
                <div className="content">Season {props.ratingPost.start_year}-{props.ratingPost.end_year} 
                { props.ratingPost.matchday !== 0 && ` matchday ${props.ratingPost.matchday}` }</div>
                <div className="post-rating-post">
                    <NavLink to={`/vote/${props.ratingPost.id}`}>Vote!</NavLink>
                </div>
            </div>
        </div>
    )
}

export default RatingPostCard;