import React, { useState } from "react"
import "../styles/PostCard.css"
import UpvotePost from '../UpvotePost'
import DownvotePost from '../DownvotePost';
import axios from 'axios';
import { NavLink } from "react-router-dom";
import commentlogo from '../../img/comment.png';
import deleteLogo from '../../img/delete.png';
import Popup from "reactjs-popup";
import { useAuth } from "../context/AuthProvider";

import { useNavigate } from "react-router-dom";

function PostCard(props) {
    
    const { auth } = useAuth();
    const navigate = useNavigate();

    const upvote = () => {
        axios.put("http://localhost:8080/posts/" + props.post.id + "/upvote");
    }

    const downvote = () => {
        axios.put("http://localhost:8080/posts/" + props.post.id + "/downvote");
    }

    const [selectedItem, setSelectedItem] = useState(null);

    const handleDeleteClick = (item) => {
        setSelectedItem(item);
    };

    const handleConfirmClick = () => {
        console.log("deleted");
        setSelectedItem(null);
        navigate("/");
    };

    function authorizeToDelete(auth) {
        if (auth === 0) {
            return null;
        } else if (auth === props.post.userId) {
            return (
                <div>
                    <button onClick={() => handleDeleteClick(props.post.id)}><img className="comment-logo" src={deleteLogo}/></button>
                    <Popup
                        className="popup"
                        open={selectedItem !== null}
                        onClose={() => setSelectedItem(null)}
                        modal
                        closeOnDocumentClick
                        styles={{
                            overlay: {
                                background: 'rgba(211, 211, 211, 1)',
                            },
                            }}
                    >
                        {close => (
                        <div className="popup-box">
                            <div>Delete Post?</div>
                            <p>Are you sure you want to delete your post? You can't undo this.</p>
                            <button onClick={close}>Cancel</button>
                            <button onClick={handleConfirmClick}>Delete Post</button>
                        </div>
                        )}
                    </Popup>
                </div>
            )
        } else {
            return null;
        }
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
            {authorizeToDelete(auth.id)}
        </div>
    )
}

export default PostCard;