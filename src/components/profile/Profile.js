import jwtDecode from "jwt-decode";
import { useAuth } from "../context/AuthProvider";
import styles from '../styles/Profile.module.css'

function Profile() {

    const { auth } = useAuth();
    const payload = jwtDecode(auth.accessToken);

    return (
        <div className={styles.profilebox}>
            <div className={styles.title}>Information</div>
            <div>ID: {auth.id}</div>
            <div>Name: {payload.sub.charAt(0).toUpperCase() + payload.sub.slice(1)}</div>
            <div>Role: {payload.roles}</div>
        </div>
    )
}

export default Profile;