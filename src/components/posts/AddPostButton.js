import { useNavigate } from "react-router-dom";
import styles from '../styles/AddPostButton.module.css'

function AddPostButton() {

    
    const navigate = useNavigate();

    return (
        <div>
            <button className={styles.button} onClick={() => navigate("/submit")}>
                <div className={styles.plus}>+</div>
                <div>Create Post</div>
            </button>
        </div>
    )
}

export default AddPostButton;