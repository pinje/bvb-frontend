import React, { useState, useEffect } from "react"
import axios from 'axios';
import PostsList from "../components/posts/PostsList.js";
import RatingPostCard from "../components/rating_post/RatingPostCard.js";
import AddPostButton from "../components/posts/AddPostButton.js";

function PostsPage() {

    const [posts, setPosts] = useState([]);
    const [ratingPost, setRatingPost] = useState("");

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
                    <div className="page-title">Home Page</div>
                    <AddPostButton/>
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