import Post from '../Post';
import React from "react"

function ProfilePostsList(props) {
    return (
        <div>
        {props.posts.map(post => (
            <Post key={post.id} post={post} />
        ))}
        </div>
    )
}

export default ProfilePostsList;