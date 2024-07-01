import "./Login.css"
import { useState, useContext } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

import {UserContext} from '../../Context/UserContext.jsx'

function Login() {

    const [userData, setUserData] = useState({
        email: '',
        password: '',
    })



    const [error, setError] = useState('')
    const navigate = useNavigate();

    const {setCurrentUser} = useContext(UserContext)

    const changeInputHandler = (e) => {
        setUserData(prevState =>{
            return {...prevState, [e.target.name]: e.target.value}
        })
    }

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/users/login`, userData);
            const user = await response.data;
            setCurrentUser(user)
            navigate('/home')
        } catch (err) {
            setError(err.response.data.message)
        }
    }

  return (
    <div className="login-component-container">
        <div className="login-section">
            <div className="login-container">
                <div className="login-card">
                    <h1>Log In</h1>
                    <form action="" className="login-form" onSubmit={loginUser}>
                    <input type="email" placeholder="E-Mail" name="email" value={userData.email} onChange={changeInputHandler} />
                    <input type="password" placeholder="Password" name="password" value={userData.password} onChange={changeInputHandler} />
                    {error && <p className="error-message">{error}</p>}
                    <button className="login-button-submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login