import React, { useState, useEffect } from "react"
import axios from 'axios';
import PostsList from "../components/posts/PostsList.js";
import RatingPostCard from "../components/rating_post/RatingPostCard.js";
import AddPostButton from "../components/posts/AddPostButton.js";
import { Tabs, Tab } from 'react-bootstrap';
import PostsNewList from "../components/posts/PostsNewList.js";

function PostsPage() {

    const [posts, setPosts] = useState([]);
    const [ratingPost, setRatingPost] = useState("");
    const [key, setKey] = useState('home');

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
                <div className="page-title">Feed</div>
                <div className="trending">
                    <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
                        <Tab 
                            eventKey={"home"} 
                            title="Top"
                        >
                        {key === 'home' && (
                            <PostsList posts={posts} />
                        )}
                        </Tab>
                        <Tab eventKey={"position"} title="New">
                        {key === 'position' && (
                            <PostsNewList posts={posts} />
                        )}
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default PostsPage;