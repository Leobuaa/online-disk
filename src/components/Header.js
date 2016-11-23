import React, { Component } from 'react';

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
          <dd className="header-link" data-active-index={this.state.headerLink.index}>
            <span className="link-item">
              <a href="#" title="onlineDisk" onClick={(e) => this.handleHeaderLinkClick(e)}>网盘</a>
            </span>
            <span className="link-item">
              <a href="#" title="share" onClick={(e) => this.handleHeaderLinkClick(e)}>分享</a>
            </span>
            <span className="link-item">
              <a href="#" title="more" onClick={(e) => this.handleHeaderLinkClick(e)}>更多</a>
            </span>
            <span className="slider-bar"></span>
          </dd>

        </dl>
      </div>
    )
  }
}

export default Header;
