import React, { useState } from "react"

function UpvotePost(props) {

    const handleSubmit = e => {
        // required to prevent standard behaviour of submitting
        e.preventDefault();
        props.upvote();
    }

    return (
        <form onSubmit={handleSubmit}>
            <button className="upvote">yea</button>
        </form>
    )
}

export default UpvotePost;