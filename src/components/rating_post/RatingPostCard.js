import { NavLink } from "react-router-dom";

function RatingPostCard(props) {

    return (
        <div className="post">
            <div className="post-box">
                <div className="author">{props.ratingPost.tournament} vs. {props.ratingPost.opponent}</div>
                <div className="title">Season {props.ratingPost.start_year}-{props.ratingPost.end_year} 
                { props.ratingPost.matchday !== 0 && ` matchday ${props.ratingPost.matchday}` }  posted @ {props.ratingPost.date}</div>
                <div className="content"></div>
                <NavLink to={`/vote/${props.ratingPost.id}`}>Vote!</NavLink>
            </div>
        </div>
    )
}

export default RatingPostCard;