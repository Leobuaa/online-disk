import React, { Component } from 'react';

class HeaderLinks extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <dd className="header-link" data-active-index={this.props.headerLink.index}>
        <span className="link-item">
          <a href="#" title="onlineDisk" onClick={this.props.onHeaderLinkClick}>网盘</a>
        </span>
        <span className="link-item">
          <a href="#" title="share" onClick={this.props.onHeaderLinkClick}>分享</a>
        </span>
        <span className="link-item">
          <a href="#" title="more" onClick={this.props.onHeaderLinkClick}>更多</a>
        </span>
        <span className="slider-bar"></span>
      </dd>
    );
  }
}

export default HeaderLinks;
