import React, { Component } from 'react';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validity: true,
      checkInfos: {
        username: null,
        email: null,
        password: null,
      },
    };
  }

  handleRegisterSubmit(event) {
    event.preventDefault();
    this.checkRegisterInfo();
    if (this.state.validity === false) {
      // 实际上这里输出的上一个状态的有效性
      console.log('The register info is invalid!');
    }
    console.log(JSON.stringify(this.props.registerInfo, null, 4));
  }

  handleInputChange(event) {
    this.props.onChange(event);
    console.log(this.props.registerInfo);
  }

  handleInputFocus(event) {
    const checkInfos = this.state.checkInfos;
    checkInfos[event.target.name] = '';
    this.setState({checkInfos: checkInfos});
  }

  checkRegisterInfo() {
    const checkInfos = this.state.checkInfos;
    let validity = true;
    validity = this.checkInfoIsNull(checkInfos) &
               this.checkInfoWhiteSpace(checkInfos) &
               this.checkPasswordLength(checkInfos);

    validity = validity == 1 ? true : false;

    this.setState({
      validity: validity,
      checkInfos: checkInfos,
    });
  }

  checkInfoIsNull(checkInfos) {
    const registerInfo = this.props.registerInfo;
    let validity = true;
    if (!registerInfo.username || registerInfo.username === '') {
      checkInfos.username = '请输入用户名';
      validity = false;
    }
    if (!registerInfo.email || registerInfo.email === '') {
      checkInfos.email = '请输入邮箱地址';
      validity = false;
    }
    if (!registerInfo.password || registerInfo.password === '') {
      checkInfos.password = '请输入密码';
      validity = false;
    }
    return validity;
  }

  checkInfoWhiteSpace(checkInfos) {
    const registerInfo = this.props.registerInfo;
    let validity = true;
    if (registerInfo.username && registerInfo.username.search(' ') != -1) {
      checkInfos.username = '用户名中不能包含空格';
      validity = false;
    }
    if (registerInfo.email && registerInfo.email.search(' ') != -1) {
      checkInfos.email = '邮箱中不能包含空格';
      validity = false;
    }
    return validity;
  }

  checkPasswordLength(checkInfos) {
    const registerInfo = this.props.registerInfo;
    if (registerInfo.password && registerInfo.password.length < 6) {
      checkInfos.password = '密码长度小于6';
      return false;
    }
    return true;
  }

  render() {
    return (
      <div className="register-form-wrapper">
        <form>
          <div className="group-inputs">
            <div className="username input-wrapper">
              <input name="username" type="text" placeholder="用户名"
                     value={this.props.registerInfo.username || ''}
                     onChange={(e) => this.handleInputChange(e)}
                     onFocus={(e) => this.handleInputFocus(e)} />
              <label className="error">{this.state.checkInfos.username}</label>
            </div>
            <div className="email input-wrapper">
              <input name="email" type="text" placeholder="邮箱地址"
                     value={this.props.registerInfo.email || ''}
                     onChange={(e) => this.handleInputChange(e)}
                     onFocus={(e) => this.handleInputFocus(e)} />
              <label className="error">{this.state.checkInfos.email}</label>
            </div>
            <div className="password input-wrapper">
              <input name="password" type="password" placeholder="密码（不少于6位）"
                     value={this.props.registerInfo.password || ''}
                     onChange={(e) => this.handleInputChange(e)}
                     onFocus={(e) => this.handleInputFocus(e)} />
              <label className="error">{this.state.checkInfos.password}</label>
            </div>
          </div>
          <div className="register-button-wrapper">
            <button className="button register-button"
                    onClick={(e) => this.handleRegisterSubmit(e)}>注册</button>
          </div>
        </form>
      </div>
    )
  }
}

export default RegisterForm;
