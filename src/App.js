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
  Switch,
  Route
} from "react-router-dom";

function App() {
  const [errorMessage, updateErrorMessage] = useState(null);
  return (
    <Router>
    <div className="App">
      <Header/>
        <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route path="/" exact={true}>
              <HomePage />
            </Route>
            <Route path="/register">
              <RegistrationForm showError={updateErrorMessage}/>
            </Route>
            <Route path="/login">
              <LoginForm showError={updateErrorMessage}/>
            </Route>
          </Switch>
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
        </div>
      <Footer />

    </div>
    </Router>
  );
}

export default App;
