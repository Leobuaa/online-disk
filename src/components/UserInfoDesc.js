import React, { Component } from 'react';
import Helper from '../helper.js';

class UserInfoDesc extends Component {
  constructor(props) {
    super(props);
  }

  handleLogoutButtonClick(event) {
    fetch(Helper.fetchLinkHeader + 'logout', {
      method: 'GET',
      credentials: 'include',
    }).then((response) => response.json() )
      .then((json) => {
        console.log(json);
        if (json.success === 1 || json.success === '1') {
          this.props.onLoginStateChange(false);
          Helper.notifyBox('退出登录成功.', 'success');
          console.log('localStorage: ', localStorage);
          localStorage.clear();
          console.log('localStorage: ', localStorage);
        } else {
          Helper.notifyBox('退出登录失败, 请再次尝试.', 'danger');
        }
      }).catch((ex) => {
        console.log(ex);
        Helper.notifyBox('退出登录失败, 请再次尝试.', 'danger');
      });
  }

  render() {
    return (
      <div className="user-info-desc-wrapper">
        <div className="desc-header">
          <span className="user-photo-box">
            <i className="user-photo"
              style={{backgroundImage: 'url(' + this.props.avatarURL +')'}}></i>
          </span>
          <span className="user-name">
            {this.props.username}
          </span>
        </div>
        <div className="menu-list list-group">
          <button
            name="userInfo"
            type="button"
            className="list-group-item"
            onClick={this.props.onUserMenuButtonClick}>个人资料</button>
          <button
            name="help"
            type="button"
            className="list-group-item"
            onClick={this.props.onUserMenuButtonClick}>帮助</button>
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
