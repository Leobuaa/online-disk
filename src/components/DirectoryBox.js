import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BodyTitle from './BodyTitle.js';
import Helper from '../helper.js';

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
    const fetchLink = 'http://localhost:3001/getDirectoryList';
    const params = {
      id: this.state.currentDirId,
      listCheckedIds: this.props.listCheckedIds,
    }
    fetch(fetchLink, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json'
      },
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
        key={obj.id}
        data-id={obj.id}
        data-title={obj.title}
        onClick={(e) => this.handleDirectoryItemClick(e)}
        >
        <div className="title" data-id={obj.id} data-title={obj.title}>
          <span className="glyphicon glyphicon-folder-open folder-icon" aria-hidden="true"
            data-id={obj.id} data-title={obj.title}></span>
          <span style={{cursor: 'pointer'}} data-id={obj.id} data-title={obj.title}>{obj.title}</span>
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

  handleConfirmButtonClick(event) {
    event.stopPropagation();
    let params = {
      ids: this.props.listCheckedIds,
      parentId: this.state.currentDirId,
    };

    let action = '移动';

    if (this.props.type === 'copyTo') {
      params.copy = true;
      action = '复制';
    }



    const fetchLink = 'http://localhost:3001/updateItems';
    fetch(fetchLink, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((response) => response.json())
      .then((json) => {
        if (json.success === '1' || json.success === 1) {
          Helper.notifyBox(action + '文件夹成功', 'success');
          ReactDOM.render(<div></div>, document.getElementById('directoryBox'));
          this.props.onFetchData();
        } else {
          let message = action + '文件夹失败, 请重试';
          if (json.code === '111') {
            message = '该文件夹下已经存在所需文件夹, 无需重复复制';
            Helper.notifyBox(message, 'success');
            ReactDOM.render(<div></div>, document.getElementById('directoryBox'));
          } else {
            Helper.notifyBox(message, 'danger');
          }
        }

      }).catch((ex) => {
        console.log(ex);
        Helper.notifyBox(action + '文件夹失败, 请重试', 'danger');
      })
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
            <span>
              确定要{this.props.alertTitle.substr(0, 3)}
              <b>{' ' +  this.state.currentDir + ' ' }</b>
              文件夹内吗?
            </span>
            <button
              type="button"
              className="btn btn-primary-outline"
              onClick={(e) => this.handleConfirmButtonClick(e)}>
              确定
            </button>
            <button
              type="button"
              className="btn btn-primary-outline"
              onClick={(e) => this.handleCancelButtonClick(e)}>
              取消
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default DirectoryBox;
