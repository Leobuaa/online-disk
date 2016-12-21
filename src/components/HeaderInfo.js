import React, { Component } from 'react';
import UserInfoDesc from './UserInfoDesc.js';

class HeaderInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfoDesc: false,
      username: '',
    };
  }

  componentDidMount() {
    let rootDir;
    try {
      rootDir = JSON.parse(localStorage.rootDir);
    } catch(e) {
      console.log('rootDir json ex: ', e);
    }

    if (rootDir) {
      this.setState({
        username: rootDir.owner,
      });
    }
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
            <i className="user-photo"></i>
          </span>
          <span className="user-name">
            {this.state.username}
          </span>
        </span>
        {this.state.showInfoDesc &&
          <UserInfoDesc
            onLoginStateChange={this.props.onLoginStateChange}
            onUserMenuButtonClick={this.props.onUserMenuButtonClick}
            username={this.state.username}/>
        }
      </dd>
    );
  }
}

export default HeaderInfo;
