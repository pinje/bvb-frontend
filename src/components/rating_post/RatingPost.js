import React, { useState, useEffect } from "react"
import "../styles/PostCard.css"
import axios from 'axios';
import VoteForm from "../rating_post_vote/VoteForm";
import VoteFormDeny from "../rating_post_vote/VoteFormDeny";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import moment from 'moment';

function RatingPost(props) {

    const [players, setPlayers] = useState([]);
    const [error, setError] = useState("");
    const [alreadyVoted, setAlreadyVoted] = useState();
    const { auth } = useAuth();
    const navigate = useNavigate();

    const params = useParams();

    const parsedId = Number(params.id);

    // get players selected to this rating post
    const getPlayers = () => {
        axios.get("http://localhost:8080/players/ratingpost/" + 6)
        .then(response => {
            setPlayers(response.data.players);
        })
        .catch(error => console.log(error));
    };

    // check if user already voted or not
    const checkIfUserAlreadyVoted = () => {
        axios.get("http://localhost:8080/ratings/alreadyvoted?ratingPostId=" 
        + 14 + "&userId=" + auth.id)
        .then(response => {
            setAlreadyVoted(response.data);
        })
        .catch(error => console.log(error));
    }

    function check(alreadyVoted) {
        if (alreadyVoted) {
            return (
                <div>
                    <VoteFormDeny/>
                </div>
            )
        } else {
            return (
                <div>
                    <VoteForm players={players} ratingPostId={6}/>
                </div>
            )
        }
    }

    function condition(auth) {
        if(auth === 0) {
            return (
                <div>
                    <VoteFormDeny/>
                </div>
            )
        } else {
            return (
                check(alreadyVoted)
            )
        }
    }

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

    useEffect(() => {
        getPlayers();
        checkIfUserAlreadyVoted();
    }, []);

    return (
        <div className="post">
            <div className="post-box">
                <div className="author">posted @ {getTime()} ago</div>
                <div className="title">{tournamentName(props.ratingPost.tournament)} <span className="opponent"> vs {props.ratingPost.opponent}</span></div>
                <div className="content">Season {props.ratingPost.start_year}-{props.ratingPost.end_year} 
                { props.ratingPost.matchday !== 0 && ` matchday ${props.ratingPost.matchday}` }</div>
                <div className="content">
                    {condition(auth.id)}
                </div>
            </div>
        </div>
    )
}

export default RatingPost;