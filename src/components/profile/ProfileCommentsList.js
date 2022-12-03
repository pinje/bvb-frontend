import Post from '../posts/PostCard';

function ProfileCommentsList(props) {
    return (
        <div>
        {props.comments.map(comment => (
            <Post key={comment.id} post={comment} />
        ))}
        </div>
    )
}

export default ProfileCommentsList;