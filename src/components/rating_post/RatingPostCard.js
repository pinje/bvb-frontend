import { NavLink } from "react-router-dom";
import moment from 'moment'

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

    return (
        <div className="post">
            <div className="post-box">
                <div className="author">{props.ratingPost.tournament} vs. {props.ratingPost.opponent}</div>
                <div className="title">Season {props.ratingPost.start_year}-{props.ratingPost.end_year} 
                { props.ratingPost.matchday !== 0 && ` matchday ${props.ratingPost.matchday}` }  posted @ {getTime()}</div>
                <div className="content"></div>
                <NavLink to={`/vote/${props.ratingPost.id}`}>Vote!</NavLink>
            </div>
        </div>
    )
}

export default RatingPostCard;