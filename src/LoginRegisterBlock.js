import React, { Component } from 'react';
import LoginRegisterTab from './LoginRegisterTab.js';
import RegisterForm from './RegisterForm.js';

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
        email: null,
        password: null,
        validtiy: false,
      }
    };
    this.handleRegisterTabClick = this.handleRegisterTabClick.bind(this);
    this.handleLoginTabClick = this.handleLoginTabClick.bind(this);
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

  render() {
    return (
      <div>
        <LoginRegisterTab
          activeTab={this.state.activeTab}
          onRegisterTabClick={this.handleRegisterTabClick}
          onLoginTabClick={this.handleLoginTabClick} />
        {this.state.activeTab === 'register' ? (
          <RegisterForm registerInfo={this.state.registerInfo} />
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default LoginRegisterBlock;
