import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import styles from '../styles/PostForm.module.css'
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
            nagivate("/success");
        })
        .catch(() => setError("Incorrect entry."));
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
            <div className="page-title">Create a post</div>
            <form  onSubmit={handleSubmit}>
                <div>
                    <div className={styles.title}>Title</div>
                    <input
                        type="text"
                        className={styles.inputtext}
                        placeholder="Title (Max. 50 characters)"
                        onChange={titleChanged}
                    />
                </div>
                <div>
                    <div className={styles.title}>Text</div>
                    <textarea
                        type="text"
                        placeholder="Text (Max. 200 characters)"
                        onChange={contentChanged}
                    />
                </div>
            <div>
                <button className={styles.submit}>Post</button>
                <div className="error">{error}</div>
            </div>
            </form>
        </div>
    )
}

export default PostForm;