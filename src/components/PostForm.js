import React, { useState } from "react"
import './styles/PostForm.css'

function PostForm(props) {

    const [title, setTitle] = useState("dummyTitle");
    const [content, setContent] = useState("dummyTitle");

    const handleSubmit = e => {
        // required to prevent standard behaviour of submitting
        e.preventDefault();
        props.addItem(title, content);
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
            </div>
            </form>
        </div>
    )
}

export default PostForm;