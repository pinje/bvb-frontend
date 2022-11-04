import React, { useState } from "react"
import '../components/LoginForm.css'

function InputItem(props) {

    const [title, setTitle] =
        useState("dummyTitle");

    const handleSubmit = e => {
        // required to prevent standard behaviour of submitting
        e.preventDefault();
        props.addItem(title)
    }

    const textChanged = e => {
        setTitle(e.target.value)
    }

    return (
        <div>
            <div className="title">Login</div>
            <div>
                Username
                <form className="form-container"
                    onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Username"
                        onChange={textChanged}
                    />
                </form>
            </div>
            <div>
                Password
                <form className="form-container"
                    onSubmit={handleSubmit}>
                    <input
                        type="password"
                        className="input-text"
                        placeholder="Password"
                        onChange={textChanged}
                    />
                </form>
            </div>
            <div>
                <button className="input-submit">Sign in</button>
            </div>
        </div>


        
    )
}

export default InputItem;