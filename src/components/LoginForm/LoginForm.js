import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";

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
            .then(function (response) {
                if (response.status === 200) {
                    setState(prevState => ({
                        ...prevState,
                        'successMessage': 'Login successful. Redirecting to home page..'
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
            .catch(function (error) {
                console.log(error);
                props.showError("An error occurred during login. Please try again.");
            });
    };

    const redirectToHome = () => {
        props.updateTitle('Home');
        props.history.push('/');
    };

    const redirectToRegister = () => {
        props.history.push('/register');
        props.updateTitle('Register');
    };

    const handleGoogleLogin = () => {
        // Add logic for Google login
        console.log('Login with Google');
    };

    return (
        <div className="login-form-container">
            <div className="login-form-wrapper">
                <h2>Welcome Back!</h2>
                <form onSubmit={handleSubmitClick}>
                    <div className="form-group text-left">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={state.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            value={state.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>

                <div className="alert alert-success mt-2" style={{ display: state.successMessage ? 'block' : 'none' }} role="alert">
                    {state.successMessage}
                </div>

                <div className="alternative-login">
                    <p>Or login with:</p>
                    <button onClick={handleGoogleLogin} className="btn google-btn">Google</button>
                </div>

                <div className="registerMessage">
                    <span>Don't have an account? </span>
                    <span className="loginText" onClick={redirectToRegister}>Register</span>
                </div>
            </div>
            <div className="animation-container">
                {/* Placeholder for animation */}
                {/* Add your animation or relevant content here */}
            </div>
        </div>
    );
}

export default withRouter(LoginForm);
