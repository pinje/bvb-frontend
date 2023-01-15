import PostCard from './PostCard';
import React from "react"

function PostsNewList(props) {
  return (
    <div>
      {props.posts.sort((a, b) => {
        const scoreA = new Date(a.date).getTime();
        const scoreB = new Date(b.date).getTime();

        return scoreB - scoreA;
      }).map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostsNewList;