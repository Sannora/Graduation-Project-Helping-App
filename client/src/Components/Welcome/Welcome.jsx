import "./Welcome.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

function Welcome() {

    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
    })

    const [error, setError] = useState('')
    const navigate = useNavigate();

    const changeInputHandler = (e) => {
        setUserData(prevState =>{
            return {...prevState, [e.target.name]: e.target.value}
        })
    }

    const registerUser = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/users/register`, userData)
            const newUser = await response.data;
            console.log(newUser);
            if(!newUser){
                setError("Couldn't register user.")
            }
            navigate('/about-you')
        } catch (err) {
            setError(err.response?.data?.message || "An error occured.");
        }
    }

    return (
        <div className="welcome-component-container">
            <div className="welcome-section s1 section-welcome">
                <div className="welcome-container welcome-card-container">
                    <div className="welcome-card welcome-section-card">
                        <h1>👋 Welcome!</h1>
                        <p>
                            This is my graduation project that is a volunteer-based helping forum/platform where
                            people ask(create posts) for help about certain predefined categories and other people
                            try to help them so it creates a volunteer helping community environment where everyone
                            is contributing by doing what they do the best.
                        </p>
                        <br />
                        <p>
                            This is still a prototype version; all functionalities work seamlessly but certain parts of
                            the web application is unable to show its functionalities on front-end interfaces just for now.
                        </p>
                        <div className="welcome-skip-buttons welcome-yes-no-buttons-container">
                            <a href="#joinUs"><button className="welcome-skip-register welcome-button-negative">Skip To Register</button></a>
                            <button className="welcome-skip-all welcome-button-positive">Skip All Steps</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="welcome-section s2 section-about-us">
                <div className="about-us-container welcome-card-container">
                    <div className="about-us-card welcome-section-card">
                        <h1>Who Are We?</h1>
                        <p>
                            We are a helping plaform that aim to create a community of people helping each other by doing
                            their best. Other instances of real-time helping platforms are mostly charging people to create
                            helping posts or help other people and etc. So this plaform is aiming to create the helping community
                            only in a volunteer based environment.
                        </p>
                        <br />
                        <p>
                            Web application for right now only has five predefined helping categories which are Academic, Translation,
                            Mechanics, Software and Craftsmanship since it is still a prototype app. Other categories may be added on
                            later development phases.
                        </p>
                    </div>
                </div>
            </div>
            <div id="joinUs" className="welcome-section s3 section-sign in">
                <div className="sign-in-container welcome-card-container">
                    <div className="sign-in-card welcome-section-card">
                        <h1>Join Us</h1>
                        <p>
                            Interested? We would be very glad to see you around. You are always
                            more than welcome in our helping community.
                        </p>
                        <form action="" className="sign-in-form" onSubmit={registerUser}>
                            <input type="text" placeholder="Username" name="username" value={userData.username} onChange={changeInputHandler} />
                            <input type="email" placeholder="E-Mail" name="email" value={userData.email} onChange={changeInputHandler} />
                            <input type="password" placeholder="Password" name="password" value={userData.password} onChange={changeInputHandler} />
                            {error && <p className="error-message">{error}</p>}
                            <button className="welcome-button-submit">Submit</button>
                        </form>
                        <p>Already have an account? <Link to={`/login`}><span>Log In</span></Link>.</p>
                    </div>
                </div>
            </div>
            <div className="welcome-section s4 section-get-started">
                <div className="get-started-container welcome-card-container">
                    <div className="get-started-card welcome-section-card">
                        <h1>Let's Get Started</h1>
                        <p>
                            We are very excited to have you around and can't wait to have a
                            little chat. Let's get to know you with few basic questions so
                            that you fit our community right in.
                        </p>
                        <br />
                        <p>
                            The questions would not take your time more than 3-5 minutes
                            and are basic questions to get to know you. We promise it won't
                            take long and not very hard.
                        </p>
                        <div className="get-started-buttons welcome-yes-no-buttons-container">
                            <button className="get-started-skip welcome-button-negative">Nah, Maybe Later</button>
                            <button className="get-started-affirmative welcome-button-positive">Let's Go!</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="welcome-section s5 section-contact">
                <div className="contact-container welcome-card-container">
                    <div className="contact-card welcome-section-card">
                        <h1>Contact Us</h1>
                        <p>
                            Have further questions? Feel free to leave a call or an
                            e-mail.
                        </p>
                        <div className="contact-buttons-container">
                            <a href="tel:+905383588219">
                                <FontAwesomeIcon className="contact-button" icon={faPhone}></FontAwesomeIcon>
                            </a>
                            <a href="mailto:mmh.melih@gmail.com">
                                <FontAwesomeIcon className="contact-button" icon={faEnvelope}></FontAwesomeIcon>
                            </a>
                            <a href="https://linkedin.com/in/melih-mecit-hocaoğlu">
                                <FontAwesomeIcon className="contact-button" icon={faLinkedinIn}></FontAwesomeIcon>
                            </a>
                            <a href="https://github.com/Sannora">
                                <FontAwesomeIcon className="contact-button" icon={faGithub}></FontAwesomeIcon>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;