import React from "react"
import User from './User';

function UsersList(props) {

  return (
    <ul>
      {props.users.map(user => (
        <User key={user.id} user={user} />
      ))}
    </ul>
  )
}

export default UsersList;