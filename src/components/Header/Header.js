import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import './Header.css';

function Header(props) {

 let title = 'oinognostis';

    function renderLogout() {
        return(
            <div className="ml-auto">
                <button className="btn-big" onClick={() => handleLogout()}>Logout</button>
            </div>
        )
    }

    function renderAuthButtons() {
        // Check if the user is logged in
        const isLoggedIn = !!localStorage.getItem(ACCESS_TOKEN_NAME);

        if (!isLoggedIn) {
            return (
                <div className="ml-auto">
                    <Link to="/login" className="btn-big">Login</Link> {}
                    <Link to="/register" className="btn-big ml-2">Signup</Link> {}
                </div>
            );
        } else {
            return renderLogout(); // If logged in, show logout button
        }
    }


    function handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN_NAME)
        window.location.reload();
    }

    return(
        <nav className="navbar navbar-dark bg-primary">
            <div className="header-container">
                <div className="header-title">
                    <Link to="/" className="app-name">{title}</Link>
                </div>
                {renderAuthButtons()}
            </div>
        </nav>
    );
}

export default withRouter(Header);