import React, { useState } from "react"
import styles from '../components/styles/LoginForm.module.css'

function LoginForm(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = e => {
        // required to prevent standard behaviour of submitting
        e.preventDefault();
        props.addItem(username, password);
    }

    const usernameChanged = e => {
        setUsername(e.target.value)
    }

    const passwordChanged = e => {
        setPassword(e.target.value);
    }

    return (
        <div>
            <div className="page-title">Login</div>
            <form className={styles.login} onSubmit={handleSubmit}>
                <div>
                    <div>Username</div>
                    <input
                        type="text"
                        className={styles.inputtext}
                        placeholder="Username"
                        onChange={usernameChanged}
                    />
                </div>
                <div>
                    <div>Password</div>
                    <input
                        type="password"
                        className={styles.inputtext}
                        placeholder="Password"
                        onChange={passwordChanged}
                    />
                </div>
                <div>{props.error}</div>
            <div className={styles.submitbox}>
                <button className={styles.submit}>SIGN IN</button>
            </div>
            </form>
        </div>
    )
}

export default LoginForm;