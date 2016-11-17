import React, { Component } from 'react';

class LoginRegisterTab extends Component {
  constructor() {
    super();
    this.state = {
      register: true,
      login: false,
    };
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  handleRegisterClick(event) {
    this.setState({
      register: true,
      login: false,
    });
    event.preventDefault();
  }

  handleLoginClick(event) {
    this.setState({
      register: false,
      login: true,
    });
    event.preventDefault();
  }

  render() {
    return (
      <div className="navs-slider" data-active-index={this.state.login ? '1' : '0'}>
          <a href="#" className={this.state.register ? 'active' : ''} onClick={this.handleRegisterClick}>注册</a>
          <a href="#" className={this.state.login ? 'active' : ''} onClick={this.handleLoginClick}>登录</a>
          <span className="navs-slider-bar"></span>
      </div>
    );
  }
}

export default LoginRegisterTab;
