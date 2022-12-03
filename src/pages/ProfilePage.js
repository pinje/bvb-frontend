import { useEffect, useState } from 'react';
import ProfilePostsList from '../components/profile/ProfilePostsList'
import Profile from '../components/profile/Profile'
import ProfileCommentsList from '../components/profile/ProfileCommentsList'
import axios from 'axios';
import { useAuth } from '../components/context/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

function ProfilePage() {

    const location = useLocation();

    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
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

    const getComments = () => {
        const userid = auth.id;

        axios.get("http://localhost:8080/comments/user?userId=" + userid)
        .then(response => {
            setComments(response.data.comments);
        })
        .catch(error => console.log(error));
    }

    useEffect(() => {
        getPosts();
        getComments();
    }, []);

    if (!auth?.accessToken) {
        return <Navigate to="/" state={{ from: location }}></Navigate>
    }

    return (
        <div className="profile-container">
            <Profile profile={profile} className="profile" />
            <ProfilePostsList posts={posts} className="post-list" />
            <ProfileCommentsList comments={comments} />
        </div>
    )
}

export default ProfilePage;