import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginRegisterBlock from './components/LoginRegisterBlock.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLogin: false
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
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <LoginRegisterBlock onLoginStateChange={(isLogin) => this.handleLoginStateChange(isLogin)}/>
        {this.state.isLogin &&
         <p>登录成功</p>}
      </div>
    );
  }
}

export default App;
