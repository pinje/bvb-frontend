import { useEffect, useState } from 'react';
import ProfilePostsList from '../components/profile/ProfilePostsList'
import Profile from '../components/profile/Profile'
import axios from 'axios';

function ProfilePage() {

    const [posts, setPosts] = useState([]);
    const [profile, setProfile] = useState();

    const getPosts = () => {
        const userid = sessionStorage.getItem("userId");

        axios.get("http://localhost:8080/posts?userId=" + userid)
        .then(response => {
            setPosts(response.data.posts);
        })
        .catch(error => console.log(error));
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="profile-container">
            <Profile profile={profile} className="profile" />
            <ProfilePostsList posts={posts} className="post-list" />
        </div>
    )
}

export default ProfilePage;