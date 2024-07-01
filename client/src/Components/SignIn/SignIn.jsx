import { useEffect } from "react";
import "./SignIn.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons"
import { faLanguage } from "@fortawesome/free-solid-svg-icons"
import { faCode } from "@fortawesome/free-solid-svg-icons"
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons"
import { faPaintBrush } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { Link } from "react-router-dom"

function SignIn(){

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [clickedItems, setClickedItems] = useState([]);

    function handleClick(event) {
        const clickedText = event.target.textContent;
        if (event.target.tagName === 'H1') {
            setClickedItems(prevItems => {
                if (prevItems.includes(clickedText)) {
                    return prevItems.filter(item => item !== clickedText);
                } else {
                    return [...prevItems, clickedText];
                }
            });
        }
    }

    const [aboutYou, setAboutYou] = useState("");

    const handleAboutYou = (event) =>{
        setAboutYou(event.target.value);
    }

    const [overlayState, setOverlayState] = useState({});

    const toggleOverlay = (id) => {
        setOverlayState(prevState => ({
          ...prevState,
          [id]: !prevState[id] || false,
        }));
      }

    const cards = [
      {
        id: "i-1",
        icon: faGraduationCap,
        title: "Academic",
        description: "You believe you have a good academic record and you may help by advising and solving problems for them (not doing people's homework).",
      },
      {
        id: "i-2",
        icon: faLanguage,
        title: "Translation",
        description: "You know more than one language and you claim that you are proefficient enough to use your skills to translate stuff.",
      },
      {
        id: "i-3",
        icon: faCode,
        title: "Software",
        description: "You are the tech guy in the group and your wisdom of software is beyond reckoning. You would like to help people in software stuff. The fact that you might love curry just adds the flavor.",
      },
      {
        id: "i-4",
        icon: faScrewdriverWrench,
        title: "Mechanics",
        description: "You might be the one with a tough look and have sweat and grease all over your clothes or a tinker-type engineering enthusiast. People may rejoice on your technical skills.",
      },
      {
        id: "i-5",
        icon: faPaintBrush,
        title: "Craftsmanship",
        description: "You might be the one with refined pleasures, a hobby grinder or an able hand in hand crafts like tailoring, sculpturing, etc.",
      },
    ];

return(
<div className="signin-component-container">
    <div className="signin-section s1 section-welcome">
        <div className="welcome-container signin-card-container">
            <div className="welcome-card signin-section-card">
                <h1>Hello Again!</h1>
                <p>
                 Now we would love you to fill out the questions below in a way that
                you feel the most comfortable. We have the perfect place for everyone
                in here. To locate you in the most suitable place in our community it is
                important for us to know about you better.
            </p>
            <br/>
            <p>
                Please note that your answers are required only to determine the fields that
                you might help people and you may change your preferences anytime later.
            </p>
        </div>
    </div>
</div>
<div className="signin-section s2 section-interests">
    <div className="interests-container signin-card-container">
        <div className="interests-card signin-section-card">
        <h1>Your Interests</h1>
            <p>
                To be a valuable part of our community we would love you to select your
                interests given below. Remember, you may be needed to help people in a
                subject related to your interests you have selected below.
            </p>
        <div className="interests-categories-container">
            {cards.map((card, index) => (
                <div key={index} onClick={() => toggleOverlay(card.id)} className={`interest-category-card ${overlayState[card.id] ? 'overlay-visible' : ''}`}>
                    <div className="interest-card-content">
                        <div className="interest-content-box">
                        <FontAwesomeIcon className="interest-icon" icon={card.icon}></FontAwesomeIcon>
                        </div>
                        <div id={card.id} onClick={handleClick} className="interest-content-box">
                            <h1>{card.title}</h1>
                            <p>{card.description}</p>
                        </div>
                        {overlayState[card.id] && <div className="overlay"></div>}
                    </div>
                </div>
            ))}
        </div>
        </div>
    </div>
</div>
<div className="signin-section s3 section-do-you-help">
    <div className="do-you-help-container signin-card-container">
        <div className="do-you-help-card signin-section-card">
            <h1>Would You Like To Help?</h1>
            <p>
                We are really excited of your skills. You see, this community is built
                on people's voluntarily helps. So your skills are crucial for our community
                to thrive and we would be really glad to see you as a helper here.
            </p>
            <br />
            <p>
                Would you like to help people with your skills as a helper? You may change
                your preference later anytime you desire.
            </p>
            <div className="do-you-help-buttons signin-yes-no-buttons-container">
                <button className="do-you-help-negative signin-button-negative">Nah, Maybe Later</button>
                <a href="#aboutYou"><button className="do-you-help-affirmative signin-button-positive">Sure!</button></a>
            </div>
        </div>
    </div>
</div>
<div id="aboutYou" className="signin-section s4 section-about-you">
    <div className="about-you-container signin-card-container">
        <div className="about-you-card signin-section-card">
            <h1>About You</h1>
            <p>
                People would also like to know more about you as we did. It is time to address the
                community. Let's see about your brief introduction letter. You may use it to
                tell about your interests and skills in more detail; your qualifications, educations
                and etc.
            </p>
            <br/>
            <textarea rows="10" placeholder="What can you tell us about yourself?" onChange={handleAboutYou} ></textarea>
        </div>
    </div>
</div>
<div className="signin-section s5 profile-ready">
<div className="profile-ready-container signin-card-container">
        <div className="profile-ready-card signin-section-card">
            <h1>Ready to Go</h1>
            <p>
                Your profile is ready to go. Here is an overview of it.
            </p>
            <div className="signin-profile-view">
            <div className="clicked-items-container">
            <p>Interests:</p>
                {clickedItems.map((item, index) => (
                    <div key={index} className="clicked-item">
                        <p>{item}</p>
                    </div>
                ))}
            </div>
            <p>About You: {aboutYou} </p>
            </div>
            <Link to={`/home`}><button className="start-helping-button">Start Helping</button></Link>
        </div>
    </div>
</div>
</div>
)
    
}

export default SignIn;