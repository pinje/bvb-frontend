import React from "react"
import { NavLink } from "react-router-dom"
import styles from './styles/NavBar.module.css'
import logo from '../img/bvb.png'
import { useNavigate } from "react-router";
import { useAuth } from "./context/AuthProvider";

function AdminNavBar() {

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
        },
        {
            id: 5,
            path: "/admin",
            text: "Admin"
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
            <li> <NavLink onClickCapture={logout}>Logout</NavLink> </li>
            
        </nav>
    )
}

export default AdminNavBar;