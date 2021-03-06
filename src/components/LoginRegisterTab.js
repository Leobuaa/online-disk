import React, { Component } from 'react';

class LoginRegisterTab extends Component {
  constructor(props) {
    super(props);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  handleRegisterClick(event) {
    this.props.onRegisterTabClick();
  }

  handleLoginClick(event) {
    this.props.onLoginTabClick();
  }

  render() {
    return (
      <div className="navs-slider" data-active-index={this.props.activeTab === 'register' ? '0' : '1'}>
          <a href="#register" className={this.props.activeTab === 'register' ? 'active' : ''} onClick={this.handleRegisterClick}>注册</a>
          <a href="#login" className={this.props.activeTab === 'login' ? 'active' : ''} onClick={this.handleLoginClick}>登录</a>
          <span className="navs-slider-bar"></span>
      </div>
    );
  }
}

export default LoginRegisterTab;
