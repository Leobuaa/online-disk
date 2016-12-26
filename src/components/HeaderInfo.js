import React, { Component } from 'react';
import UserInfoDesc from './UserInfoDesc.js';
import Helper from '../helper.js';

class HeaderInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfoDesc: false,
      username: '',
      avatarURL: 'https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/item/0945792c.jpg',
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

    this.setState({
      avatarURL: Helper.fetchLinkHeader + localStorage.avatarURL,
    });
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
              style={{backgroundImage: 'url(' + this.state.avatarURL + ')'}}></i>
          </span>
          <span className="user-name">
            {this.state.username}
          </span>
        </span>
        {this.state.showInfoDesc &&
          <UserInfoDesc
            onLoginStateChange={this.props.onLoginStateChange}
            onUserMenuButtonClick={this.props.onUserMenuButtonClick}
            username={this.state.username}
            avatarURL={this.state.avatarURL}/>
        }
      </dd>
    );
  }
}

export default HeaderInfo;
