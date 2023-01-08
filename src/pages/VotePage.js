import { useParams } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import RatingPost from "../components/rating_post/RatingPost"

function VotePage() {

    const params = useParams();

    const parsedId = Number(params.id);

    const [ratingPost, setRatingPost] = useState([]);

    const getRatingPost = () => {
        axios.get("http://localhost:8080/ratingposts/" + parsedId)
        .then((res) => {
            setRatingPost(res.data);
        })
        .catch(error => console.log(error));
    };

    useEffect(() => {
        getRatingPost()
    }, []);

    return (
        <div className="post-container">
            <RatingPost key={ratingPost.id} ratingPost={ratingPost}/>
        </div>
    )

}

export default VotePage;