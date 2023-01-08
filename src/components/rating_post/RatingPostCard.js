function RatingPostCard(props) {
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

export default RatingPostCard;