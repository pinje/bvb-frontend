import React from "react"
import { NavLink } from "react-router-dom"
import styles from './styles/NavBar.module.css'
import logo from '../img/bvb.png'
import SearchBar from "./search/SearchBar"

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
        }
    ];

    return (
        <div>
            <nav className={styles.navBar}>
                <div className={styles.logo}><img src={logo}/></div>
                <div classname={styles.navbox}>
                    <div className={styles.navelement}>
                        {links.map(link => {
                        return (
                            <li key={link.id}>
                                <NavLink to={link.path}>
                                    {link.text}
                                </NavLink>
                            </li>
                        )
                        })}
                    </div>
                    <div className={styles.searchbox}>
                        <SearchBar/>
                    </div>
                </div>
                <div className={styles.auth}>
                    <li key={3}><NavLink to={"/login"}>Login</NavLink></li>
                    <li key={4}><NavLink to={"/signup"}>Signup</NavLink></li>
                </div>
            </nav>
        </div>
    )
}

export default NotAuthNavBar;