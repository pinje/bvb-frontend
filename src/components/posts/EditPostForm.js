import React, { useEffect, useState } from "react"
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import '../styles/PostForm.css'
import axios from "axios";

function EditPostForm(props) {
    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const nagivate = useNavigate();
    const auth = useAuth();
    const location = useLocation();

    if (!auth?.auth.accessToken || auth?.auth.id != props.post.userId) {
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
            nagivate("/");
        })
        .catch(setError("Incorrect entry."));
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
            <div className="title">Edit post</div>
            <form className="form-container"  onSubmit={handleSubmit}>
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
                <button className="input-submit">Edit Post</button>
                <div className="error">{error}</div>
            </div>
            </form>
        </div>
    )
}

export default EditPostForm;