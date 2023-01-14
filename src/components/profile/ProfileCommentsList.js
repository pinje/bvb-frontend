import Comment from '../comments/Comment';
import styles from '../styles/Profile.module.css'

function ProfileCommentsList(props) {
    return (
        <div>
        <div className={styles.pagetitle}>Comment posted</div>
        {props.comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
        ))}
        </div>
    )
}

export default ProfileCommentsList;