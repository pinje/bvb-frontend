import React from "react"
import Comment from './Comment'

function PostsList(props) {

  return (
    <div>
      {props.comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  )
}

export default PostsList;