import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import '../styles/PostForm.css'
import axios from "axios";

function PostForm(props) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const nagivate = useNavigate();
    const auth = useAuth();

    const addPost = (title, content) => {
        const config = {
            headers: { Authorization: `Bearer ${auth.auth.accessToken}` }
        }

        const newPost = {
            "title": title,
            "content": content,
            "vote": 1,
            "userId": auth.auth.id
        }

        axios.post("http://localhost:8080/posts", newPost, config)
        .then(response => {
            console.log(`Post added ID: ${response.data.postId}`);
            nagivate("/");
        })
        .catch(setError("Incorrect entry."));
    }

    const handleSubmit = e => {
        // required to prevent standard behaviour of submitting
        e.preventDefault();
        addPost(title, content);
    }

    const titleChanged = e => {
        setTitle(e.target.value)
    }

    const contentChanged = e => {
        setContent(e.target.value);
    }

    return (
        <div>
            <div className="title">Create a post</div>
            <form className="form-container"  onSubmit={handleSubmit}>
                <div>
                    <div>Title</div>
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Title (Max. 50 characters)"
                        onChange={titleChanged}
                    />
                </div>
                <div>
                    <div>Text</div>
                    <textarea
                        type="text"
                        className="input-text-content"
                        placeholder="Text (Max. 200 characters)"
                        onChange={contentChanged}
                    />
                </div>
            <div>
                <button className="input-submit">Post</button>
                <div className="error">{error}</div>
            </div>
            </form>
        </div>
    )
}

export default PostForm;