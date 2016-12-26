import React, { Component } from 'react';
import LoginRegisterTab from './LoginRegisterTab.js';
import RegisterForm from './RegisterForm.js';
import LoginForm from './LoginForm.js';

class LoginRegisterBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'login',
      registerInfo: {
        username: null,
        email: null,
        password: null,
      },
      loginInfo: {
        username: null,
        password: null,
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

  autoFillLoginForm() {
    const registerInfo = this.state.registerInfo;
    const loginInfo = this.state.loginInfo;

    loginInfo.username = registerInfo.username;
    loginInfo.password = registerInfo.password;
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
          <RegisterForm
            registerInfo={this.state.registerInfo}
            autoFillLoginForm={() => this.autoFillLoginForm()}
            onChange={(e) => this.handleRegisterInfoChange(e)}/>
        ) : (
          <LoginForm
            loginInfo={this.state.loginInfo}
            onChange={(e) => this.handleLoginInfoChange(e)}
            onLoginStateChange={this.props.onLoginStateChange}
            onUpdateUserInfo={this.props.onUpdateUserInfo}/>
        )}
      </div>
    );
  }
}

export default LoginRegisterBlock;
