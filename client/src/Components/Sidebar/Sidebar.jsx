import "./Sidebar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightFromBracket, faHandshakeAngle, faClipboardQuestion } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Sidebar() {
    const [isHelplistVisible, setIsHelplistVisible] = useState(true);
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    const toggleHelpList = () => {
        setIsHelplistVisible(!isHelplistVisible);
    }

    const handleLogoutClick = () => {
        navigate('/logout');
    }

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/posts`);
                setPosts(response.data);
            } catch (err) {
                console.error("Error fetching posts:", err);
                setPosts([]);
            }
        };
    
        fetchPosts();
    }, []);

    return (
        <div className="sidebar-container">
            <div className="sidebar">
                <div className={`help-list-container ${isHelplistVisible ? 'help-list-visible' : ''}`}>
                    <div className="categories-container">
                        <ul className="helping-categories">
                            <li>Academic</li>
                            <li>Translation</li>
                            <li>Software</li>
                            <li>Mechanics</li>
                            <li>Craftsmanship</li>
                        </ul>
                        <p>*number* people are looking for help in *category*</p>
                    </div>

                    <ul className="help-list">
                        {posts.length > 0 ? (
                            posts.map(post => (
                                <li className="help-ticket" key={post.id}>
                                    <Link to={`/posts/${post.id}`}>
                                        <h1 className="help-subject">{post.title}</h1>
                                    </Link>
                                    <hr />
                                    <p className="help-details">{post.description}</p>
                                    <ul className="help-interests">
                                        <li key={post.category}>{post.category}</li>
                                    </ul>
                                </li>
                            ))
                        ) : (
                            <li>No posts found.</li>
                        )}
                    </ul>
                </div>
                <div className="user-section">
                    <div className="user-utility-buttons">
                        <FontAwesomeIcon icon={faRightFromBracket} className="user-utility-button" onClick={handleLogoutClick} />
                        <FontAwesomeIcon icon={faHandshakeAngle} className="user-utility-button toggle-help-button" onClick={toggleHelpList} />
                        <Link to={`/ask-for-help`}><FontAwesomeIcon icon={faClipboardQuestion} className="user-utility-button ask-question-button" /></Link>
                        <FontAwesomeIcon icon={faUser} className="user-utility-button" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;