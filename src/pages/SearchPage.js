import { useParams } from "react-router-dom"
import React, { useState, useEffect } from "react"
import axios from "axios";
import PostsList from "../components/posts/PostsList";

function SearchPage() {

    const params = useParams();

    const parsedQuery = params.query;

    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);

    const getPosts = () => {
        axios.get("http://localhost:8080/posts")
        .then(response => {
            setPosts(response.data.posts);
        })
        .catch(error => console.log(error));
    };

    function filteredData() {
        setFilteredPosts(posts.filter(post =>
            post.title.toLowerCase().includes(parsedQuery.toLowerCase())));
    }

    function condition(posts) {
        if (posts.length == 0) {
            return (
                <div>No posts found.</div>
            )
        } else {
            return (
                <PostsList posts={posts} />
            )
        }
    }

    useEffect(() => {
        getPosts();
        filteredData();
    }, []);

    return (
        <div className="container">
            <div className="inner">
                <div className="page-title">Search Results</div>
                {condition(filteredPosts)}
            </div>
        </div>
    )
}

export default SearchPage;