import React, { useState } from "react"
import styles from "../styles/Comment.module.css"
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import deleteLogo from '../../img/delete.png';
import Popup from "reactjs-popup";
import moment from 'moment'
import axios from "axios";

function Comment(props) {

    const { auth } = useAuth();
    const navigate = useNavigate();

    const [selectedItem, setSelectedItem] = useState(null);
    const [error, setError] = useState("");

    const deleteComment = (commentId) => {
        const config = {
            headers: { Authorization: `Bearer ${auth.accessToken}` }
        }

        axios.delete("http://localhost:8080/comments/" + commentId, config)
        .then(response => {
            console.log(`Comment deleted ID: ${commentId}`);
            navigate("/");
        })
        .catch(() => setError("Incorrect entry."));
    }

    const handleDeleteClick = (item) => {
        setSelectedItem(item);
    };

    const handleConfirmClick = () => {
        deleteComment(selectedItem);
        setSelectedItem(null);
        navigate("/");
    };

    function authorizeToDelete(auth) {
        if (auth === 0) {
            return null;
        } else if (auth === props.comment.userId) {
            return (
                <div>
                    <button className={styles.button} onClick={() => handleDeleteClick(props.comment.id)}><img className={styles.logo} src={deleteLogo}/></button>
                    <Popup
                        className={styles.popup}
                        open={selectedItem !== null}
                        onClose={() => setSelectedItem(null)}
                        modal
                        closeOnDocumentClick
                    >
                        {close => (
                        <div className={styles.popupbox}>
                            <div>Delete Comment?</div>
                            <p>Are you sure you want to delete your comment? You can't undo this.</p>
                            <button onClick={close}>Cancel</button>
                            <button onClick={handleConfirmClick}>Delete Comment</button>
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
        const date = props.comment.date;
        const dateFormatted = moment(date);
        const now = moment().format();

        const difference = moment.duration(moment(now).diff(moment(dateFormatted)));

        return (
            difference.humanize()
        )
    }
    
    return (
        <div className={styles.comment}>
            <div>
                <div className={styles.author}>
                    {props.comment.username} @ {getTime()} ago
                </div>
                <div className={styles.content}>
                    {props.comment.comment}
                </div>
            </div>
            <div>
                {authorizeToDelete(auth.id)}
            </div>
        </div>
    )
}

export default Comment;