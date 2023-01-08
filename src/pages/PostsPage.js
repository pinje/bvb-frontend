import React, { useState, useEffect } from "react"
import axios from 'axios';
import PostsList from "../components/posts/PostsList.js";
import { useNavigate } from "react-router-dom";
import RatingPostCard from "../components/rating_post/RatingPostCard.js";

function PostsPage() {

    const [posts, setPosts] = useState([]);
    const [ratingPost, setRatingPost] = useState("");
    const navigate = useNavigate();

    const getPosts = () => {
        axios.get("http://localhost:8080/posts")
        .then(response => {
            setPosts(response.data.posts);
        })
        .catch(error => console.log(error));
    };

    const getMostRecentRatingPost = () => {
        axios.get("http://localhost:8080/ratingposts/latest")
        .then(response => {
            setRatingPost(response.data);
        })
        .catch(error => console.log(error));
    }

    useEffect(() => {
        getPosts();
        getMostRecentRatingPost();
    }, []);

    return (
        <div className="container">
            <div className="inner">
                <div className="title-box">
                    <div className="title">Home Page</div>
                    <div className="add-post-button">
                        <button className="add-post" onClick={() => navigate("/submit")}>
                            <div className="plus-button">+</div>
                            <div>Create Post</div>
                        </button>
                    </div>
                </div>
                <div>
                    <RatingPostCard ratingPost={ratingPost}/>
                </div>
                <hr/>
                <div className="post-list">
                    <PostsList posts={posts} />
                </div>
                
            </div>
        </div>
    )
}

export default PostsPage;