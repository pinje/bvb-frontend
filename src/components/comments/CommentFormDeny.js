import React, { useState } from "react"
import '../styles/CommentFormDeny.css'
import { NavLink, useNavigate } from "react-router-dom";

function CommentFormDeny() {

    return (
        <div>
            <div className="title">Comment</div>
            <div className="form-container-deny-box">
                <div className="text">
                    Login or Signup to comment
                </div>
                <div className="form-container-deny">
                    <NavLink to={"/login"}>login</NavLink>
                    or
                    <NavLink to={"/signup"}>signup</NavLink>
                </div>
            </div>
            
        </div>
    )
}

export default CommentFormDeny;