import React from "react"
import "../styles/PostCard.css"
import UpvotePost from '../UpvotePost'
import DownvotePost from '../DownvotePost';
import axios from 'axios';
import { NavLink } from "react-router-dom";
import commentlogo from '../../img/comment.png';

function PostCard(props) {

    const upvote = () => {
        axios.put("http://localhost:8080/posts/" + props.post.id + "/upvote");
    }

    const downvote = () => {
        axios.put("http://localhost:8080/posts/" + props.post.id + "/downvote");
    }
    
    return (
        <div className="post">
            <UpvotePost upvote={upvote} />
            {props.post.vote}
            <DownvotePost downvote={downvote} />
            <div className="post-box">
                <div className="author">Posted by {props.post.username} @ {props.post.date}</div>
                <div className="title">{props.post.title}</div>
                <div className="content">{props.post.content}</div>
                <div className="footer">
                    <img className="comment-logo" src={commentlogo}/>
                    <NavLink to={`/post/${props.post.id}`}>Comments</NavLink>
                </div>
            </div>
        </div>
    )
}

export default PostCard;