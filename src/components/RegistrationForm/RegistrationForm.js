import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import {RiAppleLine, RiFacebookLine, RiGoogleLine} from "react-icons/ri";
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

import './RegistrationForm.css';
import PeopleQueueAnimation from '../../assets/queue_people.svg';
import axiosInstance from "../../utils/axiosInstance";

function RegistrationForm(props) {
    const navigate = useNavigate();

    const [state , setState] = useState({
        email : "",
        password : "",
        confirmPassword: "",
        first_name: "",
        last_name: "",
        successMessage: null
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const handleChange = (e) => {
        const {id , value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }));
    };

    const handleSubmitClick = (e) => {
        e.preventDefault();
        if (state.password === state.confirmPassword) {
            sendDetailsToServer();
        } else {
            props.showError('Passwords do not match');
        }
    };

    const sendDetailsToServer = async () => {
        if(state.email.length && state.password.length && state.first_name.length && state.last_name.length) {
            props.showError(null);

            const payload={
                email: state.email,
                password1: state.password,
                password2: state.confirmPassword,
                first_name: state.first_name,
                last_name: state.last_name
            };

            try {
                const response = await axiosInstance.post('/api/v1/auth/registration/', payload);

            if (response.status === 204) {
                setState((prevState) => ({
                    ...prevState,
                    successMessage: "Registration successful. Redirecting to login...",
                }));

                setTimeout(() => redirectToLogin(), 2000); // Redirect after success
                } else {
                props.showError("Something went wrong. Please try again.");
                }
            } catch (error) {
                console.error(error);

                // Handle errors gracefully
                const errorMessage = error.response?.data?.detail || "An unexpected error occurred. Please try again.";
                if (error.response?.data) {
                    // Extract the validation error messages
                    const validationErrors = error.response.data;

                    let formattedErrorMessages = "";
                    // Loop through all fields with errors and format the messages
                    for (const [field, messages] of Object.entries(validationErrors)) {
                        formattedErrorMessages += `${field}: ${messages.join(", ")}\n`;
                    }

                    console.log("Formatted Errors: ", formattedErrorMessages);

                    // Show formatted error messages
                    props.showError(formattedErrorMessages);
                } else {
                    props.showError("An unexpected error occurred. Please try again.");
                }
            }

        } else {
            props.showError('Please fill in all fields.')
        }
    };

    const redirectToLogin = () => {
        document.title = 'Login';
        navigate('/login');
    };

    const handleGoogleLogin = () => {
        // Add logic for Google login
        console.log('Login with Google');
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);


    return (
        <main className="registration-form">
            <div className="registration-form__container">
                <div className="registration-form__wrapper">
                    <h2 className="registration-form__title">hey.</h2>
                    <h3 className="registration-form__subtitle">Join the club today</h3>
                    <form onSubmit={handleSubmitClick}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="registration-form__input"
                                id="first_name"
                                placeholder="First Name"
                                value={state.first_name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                className="registration-form__input"
                                id="last_name"
                                placeholder="Last Name"
                                value={state.last_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="registration-form__input"
                                id="email"
                                placeholder="Email"
                                value={state.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group password-field">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="registration-form__input"
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
                                {showPassword ? <IoEyeOffOutline/> : <IoEyeOutline/>}
                            </button>
                        </div>

                        <div className="form-group password-field">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="registration-form__input"
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                value={state.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={toggleConfirmPasswordVisibility}
                                aria-label="Toggle confirm password visibility"
                            >
                                {showConfirmPassword ? <IoEyeOffOutline/> : <IoEyeOutline/>}
                            </button>
                        </div>

                        <p className="registration-form__terms">
                            By signing up, you agree to our <a href="/terms" className="registration-form__link">Terms
                            of
                            Use</a> and <a href="/privacy" className="registration-form__link">Privacy Policy</a>.
                        </p>

                        <button type="submit" className="submit-btn">
                            Sign Up
                        </button>
                    </form>

                    {state.successMessage && (
                        <div className="registration-form__alert">
                            {state.successMessage}
                        </div>
                    )}

                    <div className="registration-form__alternative">
                        <p>QUICK ACCESS</p>
                        <div className="registration-form__alt-buttons">
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

                    <div className="registration-form__login">
                        <span>Already have an account? </span>
                        <span className="registration-form__login-link" onClick={redirectToLogin}>
                            Login
                        </span>
                    </div>
                </div>

                <div className="registration-form__animation">
                    <img src={PeopleQueueAnimation} alt="People animation"
                         className="registration-form__animation-img"/>
                    <a href="https://storyset.com/people" className="attribution-link" target="_blank"
                       rel="noopener noreferrer">
                        People illustrations by Storyset
                    </a>
                </div>
            </div>
        </main>
    );
}

export default RegistrationForm;