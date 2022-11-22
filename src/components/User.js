import React from "react"
import styles from "./styles/User.module.css"

function User(props) {

    return (
        <li className={styles.item}>{props.user.username}</li>
    )
}

export default User;