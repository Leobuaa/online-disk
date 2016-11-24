import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginRegisterBlock from './components/LoginRegisterBlock.js';
import Header from './components/Header.js';
import MenuAside from './components/MenuAside.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLogin: true
    };
  }

  handleLoginStateChange(isLogin) {
    console.log(isLogin);
    this.setState({
      isLogin: isLogin
    });
  }

  render() {
    return (
      <div className="App">
        {!this.state.isLogin &&
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        }
        {this.state.isLogin ? (
          <div>
            <Header />
            <MenuAside />
          </div>
        ) : (
          <LoginRegisterBlock onLoginStateChange={(isLogin) => this.handleLoginStateChange(isLogin)}/>
        )}
      </div>
    );
  }
}

export default App;
