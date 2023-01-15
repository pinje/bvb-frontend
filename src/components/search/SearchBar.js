import React, { useState } from "react"
import styles from '../styles/SearchBar.module.css'
import { useNavigate } from "react-router-dom";
import search from '../../img/search.png'

function SearchBar() {

    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState("");
    
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        if (searchQuery.length == 0) {
            setError("Empty entry. Try again with an entry.")
        } else {
            setError("");
            navigate("/search/" + searchQuery);
        }
    };

    const searchChanged = e => {
        setSearchQuery(e.target.value);
    };
    
    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.searchbox}>
                <img src={search} className={styles.logo}/>
                <input 
                    className={styles.input}
                    onChange={searchChanged}
                    placeholder="Search post by title"
                />
            </div>
            <div className="error">{error}</div>
        </form>
    )

}

export default SearchBar;