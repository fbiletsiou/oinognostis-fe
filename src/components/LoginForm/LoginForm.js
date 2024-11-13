import React, { useState } from 'react';
import PeopleDrinkingWineAnimation from '../../assets/people_drinking_wine_animation.svg';
import axios from 'axios';
import './LoginForm.css';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { useNavigate } from "react-router-dom";
import { RiGoogleLine, RiFacebookLine, RiAppleLine  } from "react-icons/ri";
import { IoEyeOffOutline, IoEyeOutline  } from 'react-icons/io5';

function LoginForm(props) {
    const navigate = useNavigate();
    const [state, setState] = useState({
        email: "",
        password: "",
        successMessage: null
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmitClick = (e) => {
        e.preventDefault();
        const payload = {
            "email": state.email,
            "password": state.password,
        };
        axios.post(API_BASE_URL + '/user/login', payload)
            .then(response => {
                if (response.status === 200) {
                    setState(prevState => ({
                        ...prevState,
                        successMessage: 'Login successful. Redirecting to home page...'
                    }));
                    localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
                    redirectToHome();
                    props.showError(null);
                } else if (response.code === 204) {
                    props.showError("Username and password do not match");
                } else {
                    props.showError("Username does not exist");
                }
            })
            .catch(error => {
                console.log(error);
                props.showError("An error occurred during login. Please try again.");
            });
    };

    const redirectToHome = () => {
        document.title = 'Home';
        navigate('/');
    };

    const redirectToRegister = () => {
        document.title = 'Register';
        navigate('/register');
    };

    const handleGoogleLogin = () => {
        // Add logic for Google login
        console.log('Login with Google');
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };


    return (
        <main className="login-form">
            <div className="login-form__container">
                <div className="login-form__wrapper">
                    <h2 className="login-form__title">Hello Again!</h2>
                    <h3 className="login-form__subtitle">Welcome back, we missed you</h3>
                    <form onSubmit={handleSubmitClick}>
                        <div className="form-group">
                            <input
                                type="email"
                                className="login-form__input"
                                id="email"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                value={state.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group password-field">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="login-form__input"
                                id="password"
                                placeholder="Password"
                                value={state.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={togglePasswordVisibility}
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                            </button>
                        </div>
                        <div className="login-form__password-recovery">
                            <a href="google.com" className="login-form__link">Forgot Password?</a>
                        </div>

                        <button type="submit" className="submit-btn">Sign In</button>
                    </form>

                    {state.successMessage && (
                        <div className="login-form__alert">
                            {state.successMessage}
                        </div>
                    )}

                    <div className="login-form__alternative">
                        <p>Or continue with:</p>
                        <div className="login-form__alt-buttons">
                            <button onClick={handleGoogleLogin} className="alt-login-btn">
                                <RiGoogleLine size={20}/>
                            </button>
                            <button className="alt-login-btn">
                                <RiFacebookLine size={20}/>
                            </button>
                            <button className="alt-login-btn">
                                <RiAppleLine size={20}/>
                            </button>
                        </div>
                    </div>

                        <div className="login-form__register">
                            <span>Not a member yet? </span>
                            <span className="login-form__register-link" onClick={redirectToRegister}>Register now</span>
                        </div>
                    </div>

                <div className="login-form__animation">
                    <img src={PeopleDrinkingWineAnimation} alt="People animation"
                         className="login-form__animation-img"/>
                    <a href="https://storyset.com/people" className="attribution-link" target="_blank"
                       rel="noopener noreferrer">
                        People illustrations by Storyset
                    </a>
                </div>
            </div>
        </main>

    );
}

export default LoginForm;
