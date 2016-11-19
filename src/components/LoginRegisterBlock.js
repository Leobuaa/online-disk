import React, { Component } from 'react';
import LoginRegisterTab from './LoginRegisterTab.js';
import RegisterForm from './RegisterForm.js';
import LoginForm from './LoginForm.js';

class LoginRegisterBlock extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: 'register',
      registerInfo: {
        username: null,
        email: null,
        password: null,
        validtiy: false,
      },
      loginInfo: {
        username: null,
        password: null,
        validtiy: false,
      }
    };
  }

  handleRegisterTabClick(event) {
    this.setState({
      activeTab: 'register',
    });
  }

  handleLoginTabClick(event) {
    this.setState({
      activeTab: 'login',
    });
  }

  handleRegisterInfoChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const registerInfo = this.state.registerInfo;
    registerInfo[name] = value;
    this.setState({
      activeTab: 'register',
      registerInfo: registerInfo,
    });
  }

  handleLoginInfoChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const loginInfo = this.state.loginInfo;
    loginInfo[name] = value;
    this.setState({
      activeTab: 'login',
      loginInfo: loginInfo,
    });
  }

  render() {
    return (
      <div>
        <LoginRegisterTab
          activeTab={this.state.activeTab}
          onRegisterTabClick={(e) => this.handleRegisterTabClick(e)}
          onLoginTabClick={(e) => this.handleLoginTabClick(e)} />
        {this.state.activeTab === 'register' ? (
          <RegisterForm registerInfo={this.state.registerInfo} onChange={(e) => this.handleRegisterInfoChange(e)}/>
        ) : (
          <LoginForm loginInfo={this.state.loginInfo} onChange={(e) => this.handleLoginInfoChange(e)}/>
        )}
      </div>
    );
  }
}

export default LoginRegisterBlock;
