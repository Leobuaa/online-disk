import React, { Component } from 'react';
import HeaderLinks from './HeaderLinks.js';
import HeaderInfo from './HeaderInfo.js';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      headerLink: {
        index: 0
      }
    };
  }

  handleHeaderLinkClick(event) {
    const titleClick = event.target.title;
    const headerLink = this.state.headerLink;
    if (titleClick === 'onlineDisk') {
      headerLink.index = 0;
    } else if (titleClick === 'share') {
      headerLink.index = 1;
    } else if (titleClick === 'more') {
      headerLink.index = 2;
    }

    this.setState({
      headerLink: headerLink
    });
  }

  render() {
    return (
      <div className="header-wrapper">
        <dl className="index-header">
          <dt className="header-logo">
            <a href="#" title="online-disk"></a>
          </dt>
          <HeaderLinks headerLink={this.state.headerLink} onHeaderLinkClick={(e) => this.handleHeaderLinkClick(e)}/>
          <HeaderInfo />
        </dl>
      </div>
    )
  }
}

export default Header;
