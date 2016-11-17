import React, { Component } from 'react';

class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      email: null,
      password: null,
      validtiy: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    const registerInfo = 'Username: ' + this.state.username + ', Email: ' +
                         this.state.email + ', Validtiy: ' + this.state.validtiy
                         + '.';
    alert(registerInfo);
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value,
    });
    console.log(this.state);
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value,
    });
    console.log(this.state);
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
    console.log(this.state);
  }

  render() {
    return (
      <div className="register-form-wrapper">
        <form>
          <div className="group-inputs">
            <div className="username input-wrapper">
              <input name="username" type="text" placeholder="用户名" onChange={this.handleUsernameChange} />
            </div>
            <div className="email input-wrapper">
              <input name="email" type="text" placeholder="邮箱地址" onChange={this.handleEmailChange} />
            </div>
            <div className="password input-wrapper">
              <input name="password" type="password" placeholder="密码（不少于6位）" onChange={this.handlePasswordChange} />
            </div>
          </div>
          <div className="register-button-wrapper">
            <button className="button register-button" onClick={this.handleClick}>注册</button>
          </div>
        </form>
      </div>
    )
  }
}

export default RegisterForm;
