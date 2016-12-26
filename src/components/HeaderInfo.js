import React, { Component } from 'react';
import UserInfoDesc from './UserInfoDesc.js';
import Helper from '../helper.js';

class HeaderInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfoDesc: false,
    };
  }

  handleMouseOver(event) {
    this.setState({
      showInfoDesc: true
    });
  }

  handleMouseLeave(event) {
    this.setState({
      showInfoDesc: false
    });
  }

  render() {
    return (
      <dd
        className="header-info"
        onMouseOver={(e) => this.handleMouseOver(e)}
        onMouseLeave={(e) => this.handleMouseLeave(e)}>
        <span className="app-user-info">
          <span className="user-photo-box">
            <i className="user-photo"
              style={{backgroundImage: 'url(' + this.props.userInfo.avatarURL + ')'}}></i>
          </span>
          <span className="user-name">
            {this.props.userInfo.username}
          </span>
        </span>
        {this.state.showInfoDesc &&
          <UserInfoDesc
            onLoginStateChange={this.props.onLoginStateChange}
            onUserMenuButtonClick={this.props.onUserMenuButtonClick}
            username={this.props.userInfo.username}
            avatarURL={this.props.userInfo.avatarURL}/>
        }
      </dd>
    );
  }
}

export default HeaderInfo;
