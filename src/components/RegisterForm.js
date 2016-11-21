import React, { Component } from 'react';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validtiy: false,
      checkInfos: {
        username: null,
        email: null,
        password: null,
      },
    };
  }

  handleRegisterSubmit(event) {
    event.preventDefault();
    if (!this.state.validtiy) {
      console.log('The register info is invalid!');
    }
    if (!this.props.registerInfo.username || this.props.registerInfo.username == '') {
      const checkInfos = this.state.checkInfos;
      checkInfos.username = '请输入用户名';
      this.setState({checkInfos: checkInfos});
    }
    alert(JSON.stringify(this.props.registerInfo, null, 4));
  }

  handleInputChange(event) {
    this.props.onchange(event);
    console.log(this.props.registerinfo);
  }

  handleInputFocus(event) {
    const checkInfos = this.state.checkInfos;
    checkInfos[event.target.name] = '';
    this.setState({checkInfos: checkInfos});
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
              {this.state.checkInfos != null &&
                <label className="error">{this.state.checkInfos.username}</label>
              }
            </div>
            <div className="email input-wrapper">
              <input name="email" type="text" placeholder="邮箱地址"
                     value={this.props.registerInfo.email || ''}
                     onChange={(e) => this.handleInputChange(e)} />
            </div>
            <div className="password input-wrapper">
              <input name="password" type="password" placeholder="密码（不少于6位）"
                     value={this.props.registerInfo.password || ''}
                     onChange={(e) => this.handleInputChange(e)} />
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
