import PostCard from './PostCard';
import React from "react"

function PostsList(props) {

  return (
    <div>
      {props.posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

export default PostsList;