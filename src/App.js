import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RegisterForm from './RegisterForm.js';
import LoginRegisterTab from './LoginRegisterTab.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Online Disk</h2>
        </div>
        <LoginRegisterTab />
        <RegisterForm />
      </div>
    );
  }
}

export default App;
