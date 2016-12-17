import React, { Component } from 'react';

class BodyTitle extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let currentDir = this.props.currentDir;
    const bodyTitleIds = this.props.bodyTitleIds;

    if (currentDir === '/') {
      currentDir = '/全部文件';
    }

    let dirs = currentDir.split('/').filter((val) => val !== '');
    // console.log(dirs);
    console.log('currentDir is: ' + currentDir);

    let dirsList = [];
    let dir = '';
    for (let i = 0; i < dirs.length - 1; i++) {
        dir += ('/' + dirs[i]);
        dirsList.push(
          <li key={dir}>
            <a
              href="#"
              data-dir={dir}
              data-dir-id={bodyTitleIds[i]}
              onClick={this.props.handleBodyTitleLinkClick}>{dirs[i]}</a>
          </li>
        );
    }

    dirsList.push(
      <li className="active" key={dir + '/' + dirs[dirs.length - 1]}>
        {dirs[dirs.length - 1]}
      </li>
    );

    let bodyTitle =
      <ol className="breadcrumb">
        {dirsList}
      </ol>

    return bodyTitle;
  }
}

export default BodyTitle;
