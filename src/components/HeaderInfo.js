import React, { Component } from 'react';

class HeaderInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <dd className="header-info">
        <span className="app-user-info">
          <span className="user-photo-box">
            <i className="user-photo"></i>
          </span>
          <span className="user-name">
            Leo Peng
          </span>
        </span>
      </dd>
    );
  }
}

export default HeaderInfo;
