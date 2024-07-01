import "./SingleHelp.css";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../Context/UserContext";
import { useParams } from "react-router-dom";
import axios from "axios";

function SingleHelp() {
    const { id } = useParams(); // useParams kancası ile id'yi al
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/posts/${id}`);
                setPost(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        getPost();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!currentUser) {
        return <div>No user logged in.</div>;
    }

    return (
        <div className="singlehelp-component-container">
            <div className="singlehelp-container">
                <div className="singlehelp-header">
                    <div className="singlehelp-header-utility">
                        <FontAwesomeIcon icon={faTimes} className="close-help-ticket" />
                    </div>
                    <h1 className="singlehelp-title">{post.title}</h1>
                    <hr />
                    <ul className="singlehelp-interests">
                        <li>{post.category}</li>
                    </ul>
                </div>
                <div className="help-body">
                    <h1>Help Ticket Title</h1>
                    <div className="help-description">
                        <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
                    </div>
                    <p className="singlehelp-username">{currentUser.name} {currentUser.surname}</p>
                </div>
                <div className="singlehelp-utility">
                    <button className="singlehelp-button-positive">I Can Help</button>
                </div>
            </div>
        </div>
    );
}

export default SingleHelp;