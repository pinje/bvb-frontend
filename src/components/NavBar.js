import React from "react"
import { NavLink } from "react-router-dom"
import styles from './NavBar.module.css'
import logo from '../img/bvb.png'

function NavBar() {

    const links = [
        {
            id: 1,
            path: "/",
            text: "Home"
        },
        {
            id: 2,
            path: "/calendar",
            text: "Calendar"
        },
        {
            id: 3,
            path: "/results",
            text: "Results"
        },
        {
            id: 4,
            path: "/profile",
            text: "Profile"
        },
        {
            id: 5,
            path: "/login",
            text: "Login"
        },
        {
            id: 6,
            path: "/signup",
            text: "Signup"
        }
    ]

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

export default NavBar;