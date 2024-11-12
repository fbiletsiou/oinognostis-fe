import React, { useState } from 'react';
import PeopleDrinkingWineAnimation from '../../assets/people_drinking_wine_animation.svg';
import axios from 'axios';
import './LoginForm.css';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import { RiGoogleLine, RiFacebookLine, RiAppleLine  } from "react-icons/ri";

function LoginForm(props) {
    const [state, setState] = useState({
        email: "",
        password: "",
        successMessage: null
    });

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
        document.title = "Home";
        props.history.push('/');
    };

    const redirectToRegister = () => {
        document.title = "Register";
        props.history.push('/register');
    };

    const handleGoogleLogin = () => {
        // Add logic for Google login
        console.log('Login with Google');
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
                        <div className="form-group">
                            <input
                                type="password"
                                className="login-form__input"
                                id="password"
                                placeholder="Password"
                                value={state.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="login-form__password-recovery">
                            <a href="#" className="login-form__link">Forgot Password?</a>
                        </div>

                        <button type="submit" className="login-form__submit-btn">Sign In</button>
                    </form>

                    {state.successMessage && (
                        <div className="login-form__alert">
                            {state.successMessage}
                        </div>
                    )}

                    <div className="login-form__alternative">
                        <p>Or continue with:</p>
                        <div className="login-form__alt-buttons">

                            <button onClick={handleGoogleLogin} className="login-form__google-btn">
                                <RiGoogleLine size={20}/>
                            </button>
                            <button className="login-form__alt-btn">
                                <RiFacebookLine size={20}/>
                            </button>
                            <button className="login-form__alt-btn">
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

export default withRouter(LoginForm);
