import React, {useState} from 'react';
import './App.css';

import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import AlertComponent from './components/AlertComponent/AlertComponent';
import HomePage from './components/Home/HomePage';
import Footer from './components/Footer/Footer';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const [errorMessage, updateErrorMessage] = useState(null);
  return (
    <Router>
      <div className="App">
        <Header/>
        <div className="container d-flex align-items-center flex-column">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegistrationForm showError={updateErrorMessage}/>} />
            <Route path="/login" element={<LoginForm showError={updateErrorMessage}/>} />
          </Routes>
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
