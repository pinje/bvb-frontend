import { useEffect, useState } from 'react';
import ProfilePostsList from '../components/profile/ProfilePostsList'
import Profile from '../components/profile/Profile'
import axios from 'axios';
import { useAuth } from '../components/context/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

function ProfilePage() {

    const location = useLocation();

    const [posts, setPosts] = useState([]);
    const [profile, setProfile] = useState();

    const { auth } = useAuth();

    const getPosts = () => {
        const userid = auth.id;

        axios.get("http://localhost:8080/posts?userId=" + userid)
        .then(response => {
            setPosts(response.data.posts);
        })
        .catch(error => console.log(error));
    }

    useEffect(() => {
        getPosts();
    });

    if (!auth?.accessToken) {
        return <Navigate to="/" state={{ from: location }}></Navigate>
    }

    return (
        <div className="profile-container">
            <Profile profile={profile} className="profile" />
            <ProfilePostsList posts={posts} className="post-list" />
        </div>
    )
}

export default ProfilePage;