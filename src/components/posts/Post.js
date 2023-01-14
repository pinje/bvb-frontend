import React, { useState, useEffect } from "react"
import UpvotePost from '../UpvotePost'
import DownvotePost from '../DownvotePost';
import axios from 'axios';
import CommentsList from '../comments/CommentsList'
import CommentForm from "../comments/CommentForm";
import CommentFormDeny from "../comments/CommentFormDeny"
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import deleteLogo from '../../img/delete.png';
import Popup from "reactjs-popup";
import moment from 'moment'
import editLogo from '../../img/edit.png';
import styles from "../styles/Post.module.css"

function Post(props) {

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
        const config = {
            headers: { Authorization: `Bearer ${auth.accessToken}` }
        }

        const newComment = {
            "comment": comment,
            "userId": auth.id,
            "postId": props.post.id
        }

        axios.post("http://localhost:8080/comments", newComment, config)
        .then(response => {
            console.log(`Comment added ID: ${response.data.commentId}`);
            navigate("/");
        })
        .catch(setError("Incorrect entry."));
    }

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

    const [selectedItem, setSelectedItem] = useState(null);

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
                <div className={styles.footer}>
                    <button className={styles.button} onClick={() => navigate("/editpost/" + props.post.id)}><img className={styles.logo} src={editLogo}/>Edit</button>
                    <button className={styles.button} onClick={() => handleDeleteClick(props.post.id)}><img className={styles.logo} src={deleteLogo}/>Delete</button>
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
        <div>
            <div className={styles.post}>
                <div className={styles.vote}>
                    <UpvotePost upvote={upvote} />
                    {props.post.vote}
                    <DownvotePost downvote={downvote} />
                </div>
                <div className={styles.postbox}>
                    <div className={styles.author}>Posted by {props.post.username} @ {getTime()} ago</div>
                    <div className={styles.title}>{props.post.title}</div>
                    <div className={styles.content}>{props.post.content}</div>
                    {authorizeToDelete(auth.id)}
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