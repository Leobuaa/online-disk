import React, { Component } from 'react';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validity: true,
      checkInfos: {
        username: null,
        password: null,
      },
    };
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    this.checkLoginInfo();
    if (!this.state.validity) {
      //this.props.showWarning();
      console.log('The login info is invalid!');
    }
    console.log(JSON.stringify(this.props.loginInfo, null, 4));
  }

  handleInputChange(event) {
    this.props.onChange(event);
    console.log(this.props.loginInfo);
  }

  handleInputFocus(event) {
    const checkInfos = this.state.checkInfos;
    checkInfos[event.target.name] = '';
    this.setState({checkInfos: checkInfos});
  }

  checkLoginInfo() {
    const checkInfos = this.state.checkInfos;
    let validity = true;
    validity = this.checkInfoIsNull(checkInfos) &
               this.checkInfoWhiteSpace(checkInfos);

    validity = validity == 1 ? true : false;

    this.setState({
      validity: validity,
      checkInfos: checkInfos,
    });
  }

  checkInfoIsNull(checkInfos) {
    const loginInfo = this.props.loginInfo;
    let validity = true;
    if (!loginInfo.username || loginInfo.username === '') {
      checkInfos.username = '请输入用户名';
      validity = false;
    }
    if (!loginInfo.password || loginInfo.password === '') {
      checkInfos.password = '请输入密码';
      validity = false;
    }
    return validity;
  }

  checkInfoWhiteSpace(checkInfos) {
    const loginInfo = this.props.loginInfo;
    let validity = true;
    if (loginInfo.username && loginInfo.username.search(' ') != -1) {
      checkInfos.username = '用户名中不能包含空格';
      validity = false;
    }
    return validity;
  }

  render() {
    return (
      <div className="login-form-wrapper">
        <form>
          <div className="group-inputs">
            <div className="username input-wrapper">
              <input name="username" type="text" placeholder="邮箱或用户名"
                     value={this.props.loginInfo.username || ''}
                     onChange={(e) => this.handleInputChange(e)}
                     onFocus={(e) => this.handleInputFocus(e)} />
              <label className="error">{this.state.checkInfos.username}</label>
            </div>
            <div className="password input-wrapper">
              <input name="password" type="password" placeholder="密码"
                     value={this.props.loginInfo.password || ''}
                     onChange={(e) => this.handleInputChange(e)}
                     onFocus={(e) => this.handleInputFocus(e)} />
              <label className="error">{this.state.checkInfos.password}</label>
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
