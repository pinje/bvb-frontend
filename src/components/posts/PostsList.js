import PostCard from './PostCard';
import React from "react"

function PostsList(props) {
  return (
    <div>
      {props.posts.sort((a, b) => {
        const voteWeight = 0.4;
        const dateWeight = 0.6;

        const scoreA = a.vote * voteWeight + new Date(a.date).getTime() * dateWeight;
        const scoreB = b.vote * voteWeight + new Date(b.date).getTime() * dateWeight;

        return scoreB - scoreA;
      }).map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostsList;