import React from 'react';
import './HomePage.css';

const HomePage = () => {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Welcome to Your React App</h1>
            <p>This is the main page of your React application.</p>
            <button onClick={() => alert('Button Clicked!')}>Click Me</button>
        </div>
    );
};

export default HomePage;
