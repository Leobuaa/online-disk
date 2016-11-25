import React, { Component } from 'react';

class UserInfoDesc extends Component {
  constructor(props) {
    super(props);
  }

  handleLogoutButtonClick(event) {
    this.props.onLoginStateChange(false);
  }

  render() {
    return (
      <div className="user-info-desc-wrapper">
        <div className="desc-header">
          <span className="user-photo-box">
            <i className="user-photo"></i>
          </span>
          <span className="user-name">
            Leo Peng
          </span>
        </div>
        <div className="menu-list list-group">
          <button name="userInfo" type="button" className="list-group-item">个人资料</button>
          <button name="help" type="button" className="list-group-item">帮助</button>
          <button name="logout"
            type="button"
            className="list-group-item"
            onClick={(e) => this.handleLogoutButtonClick(e)}>退出</button>
        </div>
      </div>
    );
  }
}

export default UserInfoDesc;
