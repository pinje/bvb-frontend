import React, { useState } from "react"
import styles from '../styles/CommentForm.module.css'

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
            <div className="page-title">Comment</div>
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea
                        type="text"
                        placeholder="Text (Max. 200 characters)"
                        onChange={commentChanged}
                    />
                </div>
            <div>
                <button className={styles.submit}>Post Comment</button>
            </div>
            </form>
        </div>
    )
}

export default CommentForm;