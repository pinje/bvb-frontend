import Post from '../posts/PostCard';
import React from "react"
import styles from '../styles/Profile.module.css'

function ProfilePostsList(props) {
    return (
        <div>
            <div className={styles.pagetitle}>Post posted</div>
            <div>
                {props.posts.map(post => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}

export default ProfilePostsList;