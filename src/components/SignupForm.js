import React, { useState } from "react"
import '../components/styles/LoginForm.css'

function SignupForm(props) {

    const [username, setUsername] = useState("dummyTitle");
    const [password, setPassword] = useState("dummyTitle");

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
            <div className="page-title">Sign up</div>
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
            <div>
                <button className="input-submit">Sign up</button>
            </div>
            </form>
        </div>
    )
}

export default SignupForm;