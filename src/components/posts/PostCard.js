import React, { useEffect, useState } from "react"
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

    const [vote, setVote] = useState(props.post.vote);
    const [userUpvote, setUserUpvote] = useState(false);
    const [userDownvote, setUserDownvote] = useState(false);
    const [author, setAuthor] = useState(false);

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

    // check if user already upvote, downvoted or not
    const checkUpvoted = () => {
        axios.get("http://localhost:8080/votes/alreadyupvoted?postId=" 
        + props.post.id + "&userId=" + auth.id)
        .then(response => {
            setUserUpvote(response.data);
        })
        .catch(error => console.log(error));
    }

    const checkDownvoted = () => {
        axios.get("http://localhost:8080/votes/alreadydownvoted?postId=" 
        + props.post.id + "&userId=" + auth.id)
        .then(response => {
            setUserDownvote(response.data);
        })
        .catch(error => console.log(error));
    }

    function checkAuthor() {
        if (auth.id === props.post.userId) {
            setAuthor(true);
        } else {
            setAuthor(false);
        }
    }

    const handleDeleteClick = (item) => {
        setSelectedItem(item);
    };

    const handleConfirmClick = () => {
        deletePost(selectedItem);
        setSelectedItem(null);
        navigate("/");
    };

    const handleUpvote = () => {
        // from here user is allowed to upvote
        const config = {
            headers: { Authorization: `Bearer ${auth.accessToken}` }
        }

        const newVote = {
            "type": true,
            "user": auth.id,
            "post": props.post.id
        }

        // update vote table 
        if (author) {
            // need to find vote entity and update
            axios.put("http://localhost:8080/votes?postId=" + props.post.id + "&userId=" + auth.id);
        } else {
            // check if user already voted or not
            axios.get("http://localhost:8080/votes/alreadyvoted?postId=" + props.post.id + "&userId=" + auth.id)
            .then(response => {
                if (response.data) {
                    // user already voted, need to find and update vote entity
                    axios.put("http://localhost:8080/votes?postId=" + props.post.id + "&userId=" + auth.id);
                } else {
                    // user first time voting, just need to add new vote entity
                    axios.post("http://localhost:8080/votes", newVote)
                    .then(response => {
                        console.log("Vote added successfully: " + response.data.voteId);
                    })
                }
            })
        }

        // update post table vote count
        axios.put("http://localhost:8080/posts/" + props.post.id + "/upvote", null, config)
        .then(setVote(vote + 1));

        setUserDownvote(false);
        setUserUpvote(true);
      };
    
      const handleDownvote = () => {
        // from here user is allowed to downvote
        const config = {
            headers: { Authorization: `Bearer ${auth.accessToken}` }
        }

        const newVote = {
            "type": false,
            "user": auth.id,
            "post": props.post.id
        }

        // update vote table 
        if (author) {
            // need to find vote entity and update
            axios.put("http://localhost:8080/votes?postId=" + props.post.id + "&userId=" + auth.id);
        } else {
            // check if user already voted or not
            axios.get("http://localhost:8080/votes/alreadyvoted?postId=" + props.post.id + "&userId=" + auth.id)
            .then(response => {
                if (response.data) {
                    // user already voted, need to find and update vote entity
                    axios.put("http://localhost:8080/votes?postId=" + props.post.id + "&userId=" + auth.id);
                } else {
                    // user first time voting, just need to add new vote entity
                    axios.post("http://localhost:8080/votes", newVote)
                    .then(response => {
                        console.log("Vote added successfully: " + response.data.voteId);
                    })
                }
            })
        }

        // update post table vote count
        axios.put("http://localhost:8080/posts/" + props.post.id + "/downvote", null, config)
        .then(setVote(vote - 1));

        setUserDownvote(true);
        setUserUpvote(false);
      };

    useEffect(() => {
        checkUpvoted();
        checkDownvoted();
        checkAuthor();
      }, [vote, author, userUpvote, userDownvote]);

    function authorizeToDelete(auth) {
        if (auth === 0) {
            return null;
        } else if (auth === props.post.userId) {
            return (
                <div>
                    <button className={styles.button} onClick={() => navigate("/editpost/" + props.post.id)}><img className={styles.logo} src={editLogo}/></button>
                    <button className={styles.button} onClick={() => handleDeleteClick(props.post.id)}><img className={styles.logo} src={deleteLogo}/></button>
                    <Popup
                        className={styles.popup}
                        open={selectedItem !== null}
                        onClose={() => setSelectedItem(null)}
                        modal
                        closeOnDocumentClick
                    >
                        {close => (
                        <div className={styles.popupbox}>
                            <div className="popup-title">Delete Post?</div>
                            <p>Are you sure you want to delete your post? <br/> You can't undo this.</p>
                            <button className={styles.cancel} onClick={close}>Cancel</button>
                            <button className={styles.submit} onClick={handleConfirmClick}>Delete Post</button>
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
        <div className={styles.post}>
            <div className={styles.vote}>
                <button onClick={handleUpvote} disabled={userUpvote}>
                    <UpvotePost/>
                </button>
                {vote}
                <button onClick={handleDownvote} disabled={userDownvote}>
                    <DownvotePost/>
                </button>
            </div>
            <div className={styles.postbox}>
                <div className={styles.author}>posted by {props.post.username} @ {getTime()} ago</div>
                <div className={styles.title}>{props.post.title}</div>
                <div>{props.post.content}</div>
                <NavLink to={`/post/${props.post.id}`}>
                    <div className={styles.footer}>
                        <img className={styles.logo} src={commentlogo}/>
                        Comments
                    </div>
                </NavLink>
            </div>
            {authorizeToDelete(auth.id)}
        </div>
    )
}

export default PostCard;