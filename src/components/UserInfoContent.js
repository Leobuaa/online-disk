import React, { Component } from 'react';
import Helper from '../helper.js';

class UserInfoContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        username: 'Leo Peng',
        gender: '男',
        email: '616690602@qq.com',
        phone: '18888888888',
        userDesc: '程序员',
      },
      userInfoUnSave: {
        username: 'Leo Peng',
        gender: '男',
        email: '616690602@qq.com',
        phone: '18888888888',
        userDesc: '程序员',
      },
      fieldListEditState: {
        gender: false,
        email: false,
        phone: false,
        userDesc: false,
        password: false,
      },
      passwordFieldState: '', // 0: 初始状态,无错误; 1: 旧密码错误; 2: 输入的两个新密码不相同
    }
  }

  checkPassword(name) {
    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword1 = document.getElementById('newPassword1').value;
    const newPassword2 = document.getElementById('newPassword2').value;

    let validity = true;
    let errorMsg;

    if (newPassword1 !== newPassword2) {
      validity = false;
      errorMsg = '两次输入的新密码不相同';
    }

    if (oldPassword === '' || newPassword1 === '' || newPassword2 === '') {
      validity = false;
      errorMsg = '密码不能为空';
    }

    if (newPassword1.length < 6 || newPassword2.length < 6) {
      validity = false;
      errorMsg = '新密码的长度不能小于6位';
    }

    // 旧密码错误 Todo 网络请求验证密码是否正确

    this.setState({
      passwordFieldState: errorMsg
    });

    // 修改成功, Todo 发送网络请求修改成功
    if (validity === true) {
      const fieldListEditState = this.state.fieldListEditState;
      fieldListEditState[name] = !fieldListEditState[name];
      this.setState({
        fieldListEditState: fieldListEditState,
        passwordFieldState: '',
      });
    }
  }

  handleEditButtonClick(event) {
    event.preventDefault();
    const name = event.target.name;
    const fieldListEditState = this.state.fieldListEditState;
    fieldListEditState[name] = !fieldListEditState[name];
    this.setState({
      fieldListEditState: fieldListEditState
    });
  }

  handleSaveButtonClick(event) {
    event.preventDefault();
    const name = event.target.name;

    // The password field is special.
    if (name === 'password') {
      // Todo
      this.checkPassword(name);
      return;
    }

    const fieldListEditState = this.state.fieldListEditState;
    fieldListEditState[name] = !fieldListEditState[name];

    // Update userInfoUnSave to userInfo
    const userInfo = this.state.userInfo;
    const userInfoUnSave = this.state.userInfoUnSave;
    userInfo[name] = userInfoUnSave[name];
    this.setState({
      fieldListEditState: fieldListEditState,
      userInfo: userInfo
    });
  }

  handleCancelButtonClick(event) {
    event.preventDefault();
    const name = event.target.name;
    const fieldListEditState = this.state.fieldListEditState;
    fieldListEditState[name] = !fieldListEditState[name];

    // Update userInfo to userInfoUnSave
    const userInfo = this.state.userInfo;
    const userInfoUnSave = this.state.userInfoUnSave;
    userInfoUnSave[name] = userInfo[name];
    this.setState({
      fieldListEditState: fieldListEditState,
      userInfoUnSave: userInfoUnSave,
      passwordFieldState: '',
    });
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const userInfoUnSave = this.state.userInfoUnSave;
    userInfoUnSave[name] = value;
    this.setState({
      userInfoUnSave: userInfoUnSave
    });
  }

  getUserFieldLists() {
    const userInfo = this.state.userInfo;
    let userFieldLists = [];
    userFieldLists.push(this.getGenderFieldItem());
    userFieldLists.push(this.getOtherFieldItems());
    userFieldLists.push(this.getPasswordFieldItem());

    return userFieldLists;
  }

  getGenderFieldContent() {
    let genderFieldContent;
    if (this.state.fieldListEditState.gender) {
      genderFieldContent =
        <div className="field-content">
          <div className="field-input">
            <input name="gender" type="radio" value="男"
              checked={this.state.userInfoUnSave.gender === '男'}
              onChange={(e) => this.handleInputChange(e)}/> <span>男</span>
            <input name="gender" type="radio" value="女"
              checked={this.state.userInfoUnSave.gender === '女'}
              onChange={(e) => this.handleInputChange(e)}
              style={{marginLeft: '15px'}}/> <span>女</span>
            {this.getEditButtonGroup('gender')}
          </div>
        </div>
    } else {
      genderFieldContent =
        <div className="field-content">
          <span className="filed-text">
            {this.state.userInfo.gender}
          </span>
          {this.getEditButton('gender')}
        </div>;
    }

    return genderFieldContent;
  }

  getGenderFieldItem() {
    return (
      <div className="user-filed-list-item" key="gender">
        <form>
          <div className="field-label">
            <p>性别</p>
          </div>
          {this.getGenderFieldContent()}
        </form>
      </div>
    );
  }

  getPasswordFieldContent() {
    let passwordFieldContent;
    if (this.state.fieldListEditState.password) {
      passwordFieldContent =
        <div className="field-content">
          <div className="field-input">
            <input
              id="oldPassword"
              name="password"
              type="password"
              className="input-text"
              placeholder="请输入原密码" />
            <input
              id="newPassword1"
              name="password"
              type="password"
              className="input-text"
              placeholder="请输入新密码" />
            <input
              id="newPassword2"
              name="password"
              type="password"
              className="input-text"
              placeholder="请再次输入新密码" />
            <div style={{position: 'relative', height: '10px'}}>
              <label className="error">{this.state.passwordFieldState}</label>
            </div>
            {this.getEditButtonGroup('password')}
          </div>
        </div>
    } else {
      passwordFieldContent =
        <div className="field-content">
          <span className="filed-text">
            <b>***********</b>
          </span>
          {this.getEditButton('password')}
        </div>;
    }

    return passwordFieldContent;
  }

  getPasswordFieldItem() {
    return (
      <div className="user-filed-list-item" key="password">
        <form>
          <div className="field-label">
            <p>密码</p>
          </div>
          {this.getPasswordFieldContent()}
        </form>
      </div>
    );
  }

  getOtherFieldContent(name) {
    let fieldContent;
    if (this.state.fieldListEditState[name]) {
      fieldContent =
        <div className="field-content">
          <div className="field-input">
            <input
              name={name}
              type="text"
              className="input-text"
              placeholder={"请输入" + Helper.getCNFromEN(name)}
              value={this.state.userInfoUnSave[name]}
              onChange={(e) => this.handleInputChange(e)}/>
            {this.getEditButtonGroup(name)}
          </div>
        </div>
    } else {
      fieldContent =
        <div className="field-content">
          <span className="filed-text">
            {this.state.userInfo[name]}
          </span>
          {this.getEditButton(name)}
        </div>;
    }
    return fieldContent;
  }

  getOtherFieldItems() {
    const userInfo = this.state.userInfo;
    let otherFieldItems = [];
    for (let prop in userInfo) {
      if (prop === 'username' || prop === 'gender') {
        continue;
      }
      const fieldItem =
        <div className="user-filed-list-item" key={prop}>
          <form>
            <div className="field-label">
              <p>{Helper.getCNFromEN(prop)}</p>
            </div>
            {this.getOtherFieldContent(prop)}
          </form>
        </div>;
      otherFieldItems.push(fieldItem);
    }

    return otherFieldItems;
  }

  getEditButtonGroup(name) {
    return (
      <div className="edit-button-group">
        <button
          name={name}
          type="button"
          className="btn btn-save"
          onClick={(e) => this.handleSaveButtonClick(e)}>
          保存
        </button>
        <button
          name={name}
          type="button"
          className="btn btn-cancel"
          onClick={(e) => this.handleCancelButtonClick(e)}>
          取消
        </button>
      </div>
    );
  }

  getEditButton(name) {
    return (
      <button
        name={name}
        className="btn btn-edit"
        onClick={(e) => this.handleEditButtonClick(e)}>
        <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> 修改
      </button>
    );
  }

  render() {
    return (
      <div className="user-info-content">
        <div className="user-avatar">
          <div className="user-avatar-editor-mask">

          </div>
          <img
            className="avatar-large"
            src="https://pic3.zhimg.com/v2-4aa340a64110c26e29db8057c339aac2_xll.jpg 2x"
            />
        </div>
        <div className="user-field-list">
          <div className="list-header">
            <h3>
              {this.state.userInfo.username}
            </h3>
          </div>
          {this.getUserFieldLists()}
        </div>
      </div>
    );
  }
}

export default UserInfoContent;
