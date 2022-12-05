import React, { useState, useEffect } from "react"
import "../styles/PostCard.css"
import UpvotePost from '../UpvotePost'
import DownvotePost from '../DownvotePost';
import axios from 'axios';
import CommentsList from '../comments/CommentsList'
import CommentForm from "../comments/CommentForm";
import CommentFormDeny from "../comments/CommentFormDeny"
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Post(props) {

    console.log(props.post.id);

    const [comments, setComments] = useState([]);
    const [error, setError] = useState("");
    const { auth } = useAuth();
    const navigate = useNavigate();

    const upvote = () => {
        axios.put("http://localhost:8080/posts/" + props.post.id + "/upvote");
    }

    const downvote = () => {
        axios.put("http://localhost:8080/posts/" + props.post.id + "/downvote");
    }

    const getComments = () => {
        const postId = props.post.id;
        axios.get("http://localhost:8080/comments/post?postId=" + postId)
        .then(response => {
            setComments(response.data.comments);
        })
        .catch(error => console.log(error));
    };

    const addComment = (comment) => {
        const newComment = {
            "comment": comment,
            "userId": auth.id,
            "postId": props.post.id
        }
        axios.post("http://localhost:8080/comments", newComment)
        .then(response => {
            console.log(`Comment added ID: ${response.data.commentId}`);
            window.location.reload();
        })
        .catch(setError("Incorrect entry."));
    }

    useEffect(() => getComments, []);

    function condition(auth) {
        if(auth === 0) {
            return (
                <div>
                    <CommentFormDeny />
                </div>
            )
        } else {
            return (
                <div>
                    <CommentForm addComment={addComment}/>
                    <div className="error">{error}</div>
                </div>
            )
        }
    }
    
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
        {condition(auth.id)}
        <div>
            <CommentsList comments={comments} />
        </div>
        </div>
    )
}

export default Post;