import React, { useState } from "react"
import '../components/styles/LoginForm.css'

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
            <div className="title">Login</div>
            <form className="form-container"  onSubmit={handleSubmit}>
                <div>
                    <div>Username</div>
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Username"
                        onChange={usernameChanged}
                    />
                </div>
                <div>
                    <div>Password</div>
                    <input
                        type="password"
                        className="input-text"
                        placeholder="Password"
                        onChange={passwordChanged}
                    />
                </div>
                <div>{props.error}</div>
            <div>
                <button className="input-submit">Login</button>
            </div>
            </form>
        </div>
    )
}

export default LoginForm;