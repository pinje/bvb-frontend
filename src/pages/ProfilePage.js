import { useEffect, useState } from 'react';
import ProfilePostsList from '../components/profile/ProfilePostsList'
import Profile from '../components/profile/Profile'
import ProfileCommentsList from '../components/profile/ProfileCommentsList'
import axios from 'axios';
import { useAuth } from '../components/context/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';

function ProfilePage() {

    const location = useLocation();

    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [profile, setProfile] = useState();
    const [key, setKey] = useState('home');

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

        const config = {
            headers: { Authorization: `Bearer ${auth.accessToken}` }
        }

        axios.get("http://localhost:8080/comments/user?userId=" + userid, config)
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
        return <Navigate to="/autherror" state={{ from: location }}></Navigate>
    }

    return (
        <div className="profile-container">
            <Profile profile={profile} />
            <div className="profile-overview">
                <div className="page-title">History</div>
                <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
                    <Tab 
                        eventKey={"home"} 
                        title="Posts"
                    >
                    {key === 'home' && (
                        <ProfilePostsList posts={posts} />
                    )}
                    </Tab>
                    <Tab eventKey={"comments"} title="Comments">
                    {key === 'comments' && (
                        <ProfileCommentsList comments={comments} />
                    )}
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}

export default ProfilePage;