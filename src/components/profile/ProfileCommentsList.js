import Comment from '../comments/Comment';

function ProfileCommentsList(props) {
    return (
        <div>
        {props.comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
        ))}
        </div>
    )
}

export default ProfileCommentsList;