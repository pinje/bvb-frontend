import React, { useState, useEffect } from "react"
import InputItem from '../components/InputItem.js';
import UsersList from '../components/UsersList.js';
import axios from 'axios';
import PostsList from "../components/PostsList.js";

function PostsPage() {

    const [posts, setPosts] = useState([]);

    const refreshUsersList = () => {
        axios.get("http://localhost:8080/posts")
        .then(response => {
            setPosts(response.data.posts);
        })
        .catch(error => console.log(error));
    };

    useEffect(() => {
        refreshUsersList();
      }, []);

    return (
        <div className="container">
            <div className="inner">
                <PostsList posts={posts} />
            </div>
        </div>
    )
}

export default PostsPage;