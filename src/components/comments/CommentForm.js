import React, { useState } from "react"
import '../styles/CommentForm.css'

function CommentForm(props) {

    const [comment, setComment] = useState("");

    const handleSubmit = e => {
        // required to prevent standard behaviour of submitting
        e.preventDefault();
        props.addComment(comment);
    }

    const commentChanged = e => {
        setComment(e.target.value);
    }

    return (
        <div>
            <div className="title">Comment</div>
            <form className="form-container"  onSubmit={handleSubmit}>
                <div>
                    <textarea
                        type="text"
                        className="input-text-content"
                        placeholder="Text (Max. 200 characters)"
                        onChange={commentChanged}
                    />
                </div>
            <div>
                <button className="input-submit">Comment</button>
            </div>
            </form>
        </div>
    )
}

export default CommentForm;