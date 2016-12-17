import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BodyTitle from './BodyTitle.js';

class DirectoryBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDirId: '',
      currentDir: '全部文件',
      bodyTitleIds: [],
      lists: [],
    }
  }

  componentDidMount() {
    let rootDir;
    try {
      rootDir = JSON.parse(localStorage.rootDir);
      let bodyTitleIds = [];
      if (rootDir) {
        bodyTitleIds.push(rootDir._id);
        this.setState({
          currentDirId: rootDir._id,
          bodyTitleIds: bodyTitleIds,
        }, this.fetchData);
      }
    } catch(e) {
      console.log('rootDir json ex: ', e);
    }

  }

  fetchData() {
    const fetchLink = 'http://localhost:3001/getItemList/' + this.state.currentDirId;
    fetch(fetchLink, {
      method: 'GET',
      credentials: 'include',
    }).then((response) => response.json())
      .then((json) => {
        if (json.success === '1' || json.success === 1) {
          this.setState({
            lists: json.data
          });
        }
      }).catch((ex) => {
        console.log(ex);
      })
  }

  handleCancelButtonClick(event) {
    event.stopPropagation();
    ReactDOM.render(<div></div>, document.getElementById('directoryBox'));
  }

  getDirectoryList() {
    const lists = this.state.lists;
    const directoryList = lists.map((obj) =>
      <li
        className="list-group-item"
        key={obj.id}>
        <div className="title">
          <span className="glyphicon glyphicon-folder-open folder-icon" aria-hidden="true"></span>
          <span
            style={{cursor: 'pointer'}}
            data-id={obj.id}
            data-title={obj.title}
            onClick={(e) => this.handleDirectoryItemClick(e)}
            >{obj.title}</span>
        </div>
      </li>
    );

    return directoryList;
  }

  handleBodyTitleLinkClick(event) {
    const dir = event.target.dataset.dir;
    const dirId = event.target.dataset.dirId;

    const bodyTitleIds = this.state.bodyTitleIds;

    const dirs = dir.split('/').filter((val) => val !== '');

    if (dirs.length < bodyTitleIds.length) {
      bodyTitleIds.length = dirs.length;
    } else {
      bodyTitleIds.push(dirId);
    }

    this.setState({
      currentDir: dir,
      currentDirId: dirId,
      bodyTitleIds: bodyTitleIds,
    }, this.fetchData);
  }

  handleDirectoryItemClick(event) {
    event.stopPropagation();
    const dirId = event.target.dataset.id;
    const title = event.target.dataset.title;

    let currentDir = this.state.currentDir;
    let bodyTitleIds = this.state.bodyTitleIds;

    currentDir = currentDir + '/' + title;
    bodyTitleIds.push(dirId);

    this.setState({
      currentDirId: dirId,
      currentDir: currentDir,
      bodyTitleIds: bodyTitleIds,
    }, this.fetchData);
  }

  render() {
    return (
      <div>
        <div className="alert-bg" onClick={(e) => this.handleCancelButtonClick(e)}></div>
        <div className="directory-box">
          <div className="alert-title">
            <p>
              {this.props.alertTitle}
              <span
                className="glyphicon glyphicon-remove-circle cancel-icon"
                aria-hidden="true"
                onClick={(e) => this.handleCancelButtonClick(e)}></span>
            </p>
          </div>
          <div className="content">
            <div className="directory-title">
              <BodyTitle
                currentDir={this.state.currentDir}
                bodyTitleIds={this.state.bodyTitleIds}
                handleBodyTitleLinkClick={(e) => this.handleBodyTitleLinkClick(e)}
                />
            </div>
            <div className="directory-list">
              <ul className="list-group">
                {this.getDirectoryList()}
              </ul>
            </div>
          </div>
          <div className="confirm-button">

          </div>
        </div>
      </div>
    )
  }
}

export default DirectoryBox;
