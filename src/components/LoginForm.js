import React, { Component } from 'react';
import Helper from '../helper.js';
import 'whatwg-fetch';

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
    // console.log('Username: ' + localStorage.getItem('username'));
  }

  submitLoginInfo() {
    if (this.state.validity === false) {
      console.log('The login info is invalid!');
    } else {
      console.log('The login info is valid!');
      fetch(Helper.fetchLinkHeader + 'login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.props.loginInfo),
        credentials: 'include'
      })
        .then(function(response) {
          return response.json();
        }).then((json) => {
          console.log(json);
          let isLogin = false;
          if (json.success === 1 || json.success === '1') {
            let avatarURL = 'https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/item/0945792c.jpg';
            if (json.data.avatarURL) {
              avatarURL = Helper.fetchLinkHeader + json.data.avatarURL
            }
            const userInfo = {
              username: json.data.username,
              avatarURL: avatarURL,
            };

            this.props.onUpdateUserInfo(userInfo);
            localStorage.setItem('avatarURL', avatarURL);

            isLogin = true;
            localStorage.setItem('sessionId', json.data.sessionId);
            localStorage.setItem('rootDir', JSON.stringify(json.data.rootDir));
            localStorage.setItem('username', json.data.username);
            console.log('localStorage: ', localStorage);
            this.props.onLoginStateChange(isLogin);
            Helper.notifyBox('登录成功', 'success');

          } else {
            if (json.code === '1') {
              Helper.notifyBox('该用户名尚未注册.', 'danger');
            } else {
              Helper.notifyBox('用户名或密码错误.', 'danger');
            }
          }
        }).catch((ex) =>{
          console.log(ex);
          Helper.notifyBox('服务器未响应, 请稍后重试或向开发者反馈', 'danger')
        });
    }
    // console.log(JSON.stringify(this.props.loginInfo, null, 4));
  }

  handleInputChange(event) {
    this.props.onChange(event);
    // console.log(this.props.loginInfo);
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
    }, this.submitLoginInfo);
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
