import Post from '../posts/PostCard';
import React from "react"

function ProfilePostsList(props) {
    return (
        <div>
            <div className='page-title'>Post created</div>
            <br/>
            <div>
                {props.posts.map(post => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}

export default ProfilePostsList;