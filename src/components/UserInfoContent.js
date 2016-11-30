import React, { Component } from 'react';

class UserInfoContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        username: 'Leo Peng',
        gender: '男',
        email: '616690602@qq.com',
        userDesc: '程序员',
      },
      userInfoUnSave: {
        username: 'Leo Peng',
        gender: '男',
        email: '616690602@qq.com',
        userDesc: '程序员',
      },
      fieldListEditState: {
        gender: false,
        email: false,
        userDesc: false,
      }
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
      userInfoUnSave: userInfoUnSave
    });
  }

  handleRadioInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    const userInfoUnSave = this.state.userInfoUnSave;
    userInfoUnSave[name] = value;
    this.setState({
      userInfoUnSave: userInfoUnSave
    });
  }

  render() {
    let genderFieldContent;
    if (this.state.fieldListEditState.gender) {
      genderFieldContent =
        <div className="field-content">
          <div className="field-input">
            <input name="gender" type="radio" value="男"
              checked={this.state.userInfoUnSave.gender === '男'}
              onChange={(e) => this.handleRadioInputChange(e)}/> <span>男</span>
            <input name="gender" type="radio" value="女"
              checked={this.state.userInfoUnSave.gender === '女'}
              onChange={(e) => this.handleRadioInputChange(e)}/> <span>女</span>
          </div>
          <div className="edit-button-group">
            <button
              name="gender"
              type="button"
              className="btn btn-save"
              onClick={(e) => this.handleSaveButtonClick(e)}>
              保存
            </button>
            <button
              name="gender"
              type="button"
              className="btn btn-cancel"
              onClick={(e) => this.handleCancelButtonClick(e)}>
              取消
            </button>
          </div>
        </div>
    } else {
      genderFieldContent =
        <div className="field-content">
          <span className="filed-text">
            {this.state.userInfo.gender}
          </span>
          <button
            name="gender"
            className="btn btn-edit"
            onClick={(e) => this.handleEditButtonClick(e)}>
            <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> 修改
          </button>
        </div>;
    }

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

          <div className="user-filed-list-item">
              <form>
                <div className="field-label">
                  <h4>性别</h4>
                </div>
                {genderFieldContent}
              </form>
          </div>
        </div>
      </div>
    );
  }
}

export default UserInfoContent;
