import React, { Component } from 'react';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validtiy: false,
      checkInfos: {
        username: null,
        password: null,
      },
    };
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    if (!this.state.validtiy) {
      //this.props.showWarning();
      console.log('The login info is invalid!');
    }
    alert(JSON.stringify(this.props.loginInfo, null, 4));
  }

  handleInputChange(event) {
    this.props.onChange(event);
    console.log(this.props.loginInfo);
  }

  render() {
    return (
      <div className="login-form-wrapper">
        <form>
          <div className="group-inputs">
            <div className="username input-wrapper">
              <input name="username" type="text" placeholder="邮箱或用户名"
                     value={this.props.loginInfo.username || ''}
                     onChange={(e) => this.handleInputChange(e)} />
            </div>
            <div className="password input-wrapper">
              <input name="password" type="password" placeholder="密码"
                     value={this.props.loginInfo.password || ''}
                     onChange={(e) => this.handleInputChange(e)} />
            </div>
          </div>
          <div className="login-button-wrapper">
            <button className="button login-button"
                    onClick={(e) => this.handleLoginSubmit(e)}>登录</button>
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm;
