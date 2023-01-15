import { NavLink } from "react-router-dom";
import moment from 'moment'
import styles from '../styles/RatingPostCard.module.css'
import c1 from '../../img/c1.png'
import pin from '../../img/pin.png'
import bundes from '../../img/bundes.png'
import pokal from '../../img/pokal.png'
import europa from '../../img/europa.png'
import conference from '../../img/conference.png'
import friendly from '../../img/friendly.png'

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
                <div><img src={bundes} className={styles.logo}/></div>
            )
        } else if (tournament == "CHAMPIONS_LEAGUE") {
            return (
                <div><img src={c1} className={styles.logo}/></div>
            )
        } else if (tournament == "EUROPA_LEAGUE") {
            return (
                <div><img src={europa} className={styles.logo}/></div>
            )
        } else if (tournament == "CONFERENCE_LEAGUE") {
            return (
                <div><img src={conference} className={styles.logo}/></div>
            )
        } else if (tournament == "DFB_CUP") {
            return (
                <div><img src={pokal} className={styles.logo}/></div>
            )
        } else if (tournament == "FRIENDLY") {
            return (
                <div><img src={friendly} className={styles.logo}/></div>
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
                <NavLink to={`/vote/${props.ratingPost.id}`}>
                    <div className={styles.votebutton}>
                        Vote!
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default RatingPostCard;