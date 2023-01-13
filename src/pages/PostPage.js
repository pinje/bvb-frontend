import { useParams } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import Post from "../components/posts/Post"



function PostPage() {

    const params = useParams();

    const parsedId = Number(params.id);

    const [post, setPost] = useState([]);

    const getPost = () => {
        axios.get("http://localhost:8080/posts/" + parsedId)
        .then((res) => {
            setPost(res.data);
        })
        .catch(error => console.log(error));
    };

    useEffect(() => {
        getPost()
    }, []);

    return (
        <div className="container">
            <div className="inner">
                <div className="post-container">
                    <Post key={post.id} post={post}/>
                </div>
            </div>
        </div>
    )
}

export default PostPage;