import React, { useEffect } from "react"
import styles from './styles/Vote.module.css';

function UpvotePost(props) {

    const handleSubmit = e => {
        // required to prevent standard behaviour of submitting
        e.preventDefault();
    }

    return (
        <div>up</div>
    )
}

export default UpvotePost;