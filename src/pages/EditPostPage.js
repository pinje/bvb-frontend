import { useParams } from "react-router-dom"
import EditPostForm from "../components/posts/EditPostForm";
import axios from "axios"
import { useState, useEffect } from "react"

function EditPostPage() {

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
                <EditPostForm post={post}/>
            </div>
        </div>
    )
}

export default EditPostPage;