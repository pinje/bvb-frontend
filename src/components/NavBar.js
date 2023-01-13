import React from "react"
import { NavLink } from "react-router-dom"
import styles from './styles/NavBar.module.css'
import logo from '../img/bvb.png'
import { useNavigate } from "react-router";
import { useAuth } from "./context/AuthProvider";

function NavBar() {

    const navigate = useNavigate();
    const { saveAuth } = useAuth();

    const links = [
        {
            id: 1,
            path: "/",
            text: "Home"
        },
        {
            id: 2,
            path: "/team",
            text: "Team"
        },
        {
            id: 3,
            path: "/profile",
            text: "Profile"
        },
        {
            id: 4,
            path: "/chat",
            text: "Chat"
        }
    ];

    const logout = (e) => {
        e.preventDefault();
        saveAuth({
            id: 0,
            roles: [""],
            accessToken: ""
        });
        navigate("/login");
    }

    return (
        <div>
            <nav className={styles.navBar}>
                <img src={logo}/>
                {links.map(link => {
                    return (
                        <li key={link.id}>
                            <NavLink to={link.path}>
                                {link.text}
                            </NavLink>
                        </li>
                    )
                })}
                <li> <NavLink onClickCapture={logout}>Logout</NavLink></li>
            </nav>
            <input className={styles.input}></input>
            <hr/>
        </div>
    )
}

export default NavBar;