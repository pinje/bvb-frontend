import React from "react"
import "../styles/Comment.css"

function Comment(props) {
    
    return (
        <div className="comment">
            <div>
                {props.comment.username} @ {props.comment.date}
            </div>
            <div>
                {props.comment.comment}
            </div>
        </div>
    )
}

export default Comment;