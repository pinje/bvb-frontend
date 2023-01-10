import React, { useState } from "react"
import "../styles/Comment.css"
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import deleteLogo from '../../img/delete.png';
import Popup from "reactjs-popup";
import moment from 'moment'

function Comment(props) {

    const { auth } = useAuth();
    const navigate = useNavigate();

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
        } else if (auth === props.comment.userId) {
            return (
                <div>
                    <img className="comment-logo" src={deleteLogo}/> <button onClick={() => handleDeleteClick(props.post.id)}>Delete</button>
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
        <div className="comment">
            <div>
                {props.comment.username} @ {getTime()} ago
            </div>
            <div>
                {props.comment.comment}
            </div>
            {authorizeToDelete(auth.id)}
        </div>
    )
}

export default Comment;