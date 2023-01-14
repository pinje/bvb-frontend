import React, { useState } from "react"
import styles from "../styles/PostCard.module.css"
import UpvotePost from '../UpvotePost'
import DownvotePost from '../DownvotePost';
import axios from 'axios';
import { NavLink } from "react-router-dom";
import commentlogo from '../../img/comment.png';
import deleteLogo from '../../img/delete.png';
import editLogo from '../../img/edit.png';
import Popup from "reactjs-popup";
import { useAuth } from "../context/AuthProvider";
import moment from 'moment'
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
    const [error, setError] = useState("");

    const deletePost = (postId) => {
        const config = {
            headers: { Authorization: `Bearer ${auth.accessToken}` }
        }

        axios.delete("http://localhost:8080/posts/" + postId, config)
        .then(response => {
            console.log(`Post deleted ID: ${postId}`);
            navigate("/profile");
        })
        .catch(setError("Incorrect entry."));
    }

    const handleDeleteClick = (item) => {
        setSelectedItem(item);
    };

    const handleConfirmClick = () => {
        deletePost(selectedItem);
        setSelectedItem(null);
        navigate("/");
    };

    function authorizeToDelete(auth) {
        if (auth === 0) {
            return null;
        } else if (auth === props.post.userId) {
            return (
                <div>
                    <button onClick={() => handleDeleteClick(props.post.id)}><img className={styles.logo} src={deleteLogo}/></button>
                    <Popup
                        className={styles.popup}
                        open={selectedItem !== null}
                        onClose={() => setSelectedItem(null)}
                        modal
                        closeOnDocumentClick
                    >
                        {close => (
                        <div className={styles.popupbox}>
                            <div>Delete Post?</div>
                            <p>Are you sure you want to delete your post? You can't undo this.</p>
                            <button onClick={close}>Cancel</button>
                            <button onClick={handleConfirmClick}>Delete Post</button>
                        </div>
                        )}
                    </Popup>
                    <button onClick={() => navigate("/editpost/" + props.post.id)}><img className={styles.logo} src={editLogo}/></button>
                </div>
            )
        } else {
            return null;
        }
    }

    function getTime() {
        const date = props.post.date;
        const dateFormatted = moment(date);
        const now = moment().format();

        const difference = moment.duration(moment(now).diff(moment(dateFormatted)));

        return (
            difference.humanize()
        )
    }
    
    return (
        <div className={styles.post}>
            <div className={styles.vote}>
                <UpvotePost upvote={upvote} />
                {props.post.vote}
                <DownvotePost downvote={downvote} />
            </div>
            <div className={styles.postbox}>
                <div className={styles.author}>posted by {props.post.username} @ {getTime()} ago</div>
                <div className={styles.title}>{props.post.title}</div>
                <div>{props.post.content}</div>
                <div className={styles.footer}>
                    <img className={styles.logo} src={commentlogo}/>
                    <NavLink to={`/post/${props.post.id}`}>Comments</NavLink>
                </div>
            </div>
            {authorizeToDelete(auth.id)}
        </div>
    )
}

export default PostCard;