import React, { Component } from 'react';
import HeaderLinks from './HeaderLinks.js';
import HeaderInfo from './HeaderInfo.js';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header-wrapper">
        <dl className="index-header">
          <dt className="header-logo">
            <a href="#" title="online-disk"></a>
          </dt>
          <dt className="header-logo">
            <a href="#" title="online-disk"></a>
          </dt>
          <HeaderLinks headerLink={this.props.header} onHeaderLinkClick={this.props.onHeaderLinkClick}/>
          <HeaderInfo />
        </dl>
      </div>
    )
  }
}

export default Header;
