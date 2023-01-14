import jwtDecode from "jwt-decode";
import { useAuth } from "../context/AuthProvider";
import styles from '../styles/Profile.module.css'

function Profile() {

    const { auth } = useAuth();
    const payload = jwtDecode(auth.accessToken);

    return (
        <div className={styles.profilebox}>
            <div className={styles.title}>Information</div>
            <div className={styles.info}>
                <div className={styles.infoname}>ID</div>
                <div className={styles.detail}>{auth.id}</div>
            </div>
            <div className={styles.info}>
                <div className={styles.infoname}>Name</div>
                <div className={styles.detail}>{payload.sub.charAt(0).toUpperCase() + payload.sub.slice(1)}</div>
            </div>
            <div className={styles.info}>
                <div className={styles.infoname}>Role</div>
                <div className={styles.detail}>{payload.roles}</div>
            </div>
        </div>
    )
}

export default Profile;