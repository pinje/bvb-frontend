import React from "react"
import { NavLink } from "react-router-dom"
import styles from './styles/NavBar.module.css'
import logo from '../img/bvb.png'

function NotAuthNavBar() {

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
            path: "/login",
            text: "Login"
        },
        {
            id: 4, 
            path: "/signup",
            text: "Signup"
        }
    ];

    return (
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
        </nav>
    )
}

export default NotAuthNavBar;