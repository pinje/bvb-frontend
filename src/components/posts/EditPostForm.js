import React, {  useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import styles from '../styles/PostForm.module.css'
import axios from "axios";
import { Navigate, useLocation } from 'react-router-dom';

function EditPostForm(props) {
    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const nagivate = useNavigate();
    const auth = useAuth();
    const location = useLocation();

    if (!auth?.auth.accessToken) {
        return <Navigate to="/AuthError" state={{ from: location }}></Navigate>
    }

    const editPost = (title, content) => {
        const config = {
            headers: { Authorization: `Bearer ${auth.auth.accessToken}` }
        }

        if (title == "") {
            title = props.post.title
        } else if (content == "") {
            content = props.post.content
        }

        const newPost = {
            "id": props.post.id,
            "title": title,
            "content": content
        }

        axios.put("http://localhost:8080/posts/" + props.post.id, newPost, config)
        .then(response => {
            console.log(`Post edited`);
            nagivate("/success");
        })
        .catch(() => setError("Incorrect entry."));
    }

    const handleSubmit = e => {
        // required to prevent standard behaviour of submitting
        e.preventDefault();
        editPost(title, content);
    }

    const titleChanged = e => {
        setTitle(e.target.value)
    }

    const contentChanged = e => {
        setContent(e.target.value);
    }

    return (
        <div>
            {console.log(props.post)}
            <div className="page-title">Edit post</div>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>Title</div>
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Title (Max. 50 characters)"
                        onChange={titleChanged}
                        defaultValue={props.post.title}/>
                </div>
                <div>
                    <div>Text</div>
                    <textarea
                        type="text"
                        className="input-text-content"
                        placeholder="Text (Max. 200 characters)"
                        onChange={contentChanged}
                        defaultValue={props.post.content}
                    />
                </div>
            <div>
                <button className={styles.submit}>Edit Post</button>
                <div className="error">{error}</div>
            </div>
            </form>
        </div>
    )
}

export default EditPostForm;