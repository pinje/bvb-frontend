import React from "react"
import { NavLink } from "react-router-dom"
import styles from './NavBar.module.css'

function NavBar() {

    const links = [
        {
            id: 1,
            path: "/",
            text: "User List"
        }
    ]

    return (
        <nav className={styles.navBar}>
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