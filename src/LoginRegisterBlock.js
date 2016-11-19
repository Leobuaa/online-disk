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
          <div></div>
        )}
      </div>
    );
  }
}

export default LoginRegisterBlock;
