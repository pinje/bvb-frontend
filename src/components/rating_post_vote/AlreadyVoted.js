import React, { useState } from "react"
import styles from '../styles/CommentFormDeny.module.css'

function AlreadyVoted() {

    return (
        <div>
            <div className={styles.denybox}>
                <div className={styles.text}>
                    You have already voted for this game.
                </div>
            </div>
        </div>
    )

}

export default AlreadyVoted;