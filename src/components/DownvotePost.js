import React, { useState } from "react"

function DownvotePost(props) {

    const handleSubmit = e => {
        // required to prevent standard behaviour of submitting
        e.preventDefault();
        props.downvote();
    }

    return (
        <form onSubmit={handleSubmit}>
            <button className="downvote">no</button>
        </form>
    )
}

export default DownvotePost;