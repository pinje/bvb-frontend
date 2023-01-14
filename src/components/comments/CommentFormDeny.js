import React, { useState } from "react"
import styles from '../styles/CommentFormDeny.module.css'
import { NavLink, useNavigate } from "react-router-dom";

function CommentFormDeny() {

    return (
        <div>
            <div className="page-title">Comment</div>
            <div className={styles.denybox}>
                <div className={styles.text}>
                    Login or Signup to comment
                </div>
                <div className={styles.deny}>
                    <NavLink to={"/login"}>login</NavLink>
                    OR
                    <NavLink to={"/signup"}>signup</NavLink>
                </div>
            </div>
        </div>
    )
}

export default CommentFormDeny;