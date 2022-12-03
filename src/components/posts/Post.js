import React, { useState, useEffect } from "react"
import "../styles/PostCard.css"
import UpvotePost from '../UpvotePost'
import DownvotePost from '../DownvotePost';
import axios from 'axios';
import CommentsList from '../comments/CommentsList'

function Post(props) {

    const [comments, setComments] = useState([]);

    const upvote = () => {
        axios.put("http://localhost:8080/posts/" + props.post.id + "/upvote");
    }

    const downvote = () => {
        axios.put("http://localhost:8080/posts/" + props.post.id + "/downvote");
    }

    const getComments = () => {
        axios.get("http://localhost:8080/comments/post?postId=" + props.post.id)
        .then(response => {
            setComments(response.data.comments);
        })
        .catch(error => console.log(error));
    };

    useEffect(() => getComments, []);
    
    return (
        <div>
        <div className="post">
            <UpvotePost upvote={upvote} />
            {props.post.vote}
            <DownvotePost downvote={downvote} />
            <div className="post-box">
                <div className="author">Posted by {props.post.username} @ {props.post.date}</div>
                <div className="title">{props.post.title}</div>
                <div className="content">{props.post.content}</div>
            </div>
        </div>
        <div>
            <CommentsList comments={comments} />
        </div>
        </div>
    )
}

export default Post;