import React, { useState, useEffect } from "react"
import axios from 'axios';
import PostsList from "../components/posts/PostsList.js";

function PostsPage() {

    const [posts, setPosts] = useState([]);

    const getPosts = () => {
        axios.get("http://localhost:8080/posts")
        .then(response => {
            setPosts(response.data.posts);
        })
        .catch(error => console.log(error));
    };

    useEffect(() => getPosts, []);

    return (
        <div className="container">
            <div className="inner">
                <PostsList posts={posts} />
            </div>
        </div>
    )
}

export default PostsPage;