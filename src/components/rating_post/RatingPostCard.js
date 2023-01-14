import { NavLink } from "react-router-dom";
import moment from 'moment'
import styles from '../styles/RatingPostCard.module.css'
import c1 from '../../img/c1.png'
import pin from '../../img/pin.png'

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
                <div><img src={c1} className={styles.champions}/></div>
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
        <div className={styles.ratingpost}>
            <img src={pin} className={styles.pin}/>
            <div className={styles.author}>posted @ {getTime()} ago</div>
            <div className={styles.title}>
                {tournamentName(props.ratingPost.tournament)} 
                <div className={styles.opponent}><span className={styles.vs}>vs</span> {props.ratingPost.opponent}</div>
            </div>
            <div>Season {props.ratingPost.start_year}-{props.ratingPost.end_year} 
            { props.ratingPost.matchday !== 0 && ` matchday ${props.ratingPost.matchday}` }</div>
            <div className={styles.vote}>
                <div className={styles.votebutton}>
                    <NavLink to={`/vote/${props.ratingPost.id}`}>Vote!</NavLink>
                </div>
            </div>
        </div>
    )
}

export default RatingPostCard;