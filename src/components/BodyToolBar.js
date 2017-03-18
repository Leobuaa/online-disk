import React, { Component } from 'react';
import ToolBarButtonGroup from './ToolBarButtonGroup.js';
import Helper from '../helper.js';
import uniqid from 'uniqid';

class BodyToolBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInfo: '',
    };
  }

  handleInputFocus(event) {
    event.target.placeholder = '';
  }

  handleInputBlur(event) {
    if (event.target.name === 'searchInfo') {
      event.target.placeholder = '输入文件名';
    }
  }

  handleSearchInfoChange(event) {
    const value = event.target.value;
    if (event.target.name === 'searchInfo') {
      this.setState({
        searchInfo: value,
      });
    }
  }

  handleRemoveIconClick(event) {
    this.setState({
      searchInfo: '',
    }, this.props.onClearSearchInfo);
  }

  handleSearchButtonClick(event) {
    this.props.onToolBarSearchInfoChange(this.state.searchInfo);
  }

  handleUploadFileButtonClick(event) {
    const fileInput = document.getElementById('uploadFile');
    fileInput.click();
  }

  handleUploadFileChange(event) {
    // Current, One file; Todo, more files.
    const file = event.target.files[0];
    console.log(file);
    const fileType = Helper.getFileType(file.name);
    let newItem = {
      id: uniqid(),
      parentId: this.props.bodyContent.currentDirId,
      title: file.name,
      size: Helper.getFileSize(file.size),
      updatedAt: Helper.dateFormat(new Date()),
      type: fileType,
      isEdit: false,
      files: file,
    }
    console.log(newItem);

    let params = new FormData();
    for (let prop in newItem) {
      params.append(prop, newItem[prop]);
    }

    //Todo, upLoadFile; Just add a item in the database.
    const fetchLink = Helper.fetchLinkHeader + 'addItem';
    fetch(fetchLink, {
      method: 'POST',
      body: params,
      credentials: 'include'
    }).then((response) => response.json())
      .then((json) => {
        if (json.success === '1' || json.success === 1) {
          this.props.onFetchData();
          Helper.notifyBox('上传文件成功', 'success');
        } else {
          Helper.notifyBox('上传失败, 请重试', 'danger');
        }
      }).catch((ex) => {
        console.log(ex);
        Helper.notifyBox('上传失败, 请重试', 'danger');
      })
  }

  handleDownloadButtonClick(event) {
    const listCheckedIds = this.props.bodyContent.listCheckedIds;
    const activeLists = this.props.bodyContent.activeLists;
    let listCheckedIdsArray = [];
    listCheckedIds.forEach((_id) => {
      for (let obj of activeLists) {
        if (obj._id === _id) {
          let res = {_id: obj._id, filePath: obj.filePath};
          listCheckedIdsArray.push(res);
        }
      }
    });

    if (listCheckedIdsArray.length <= 0) {
      Helper.notifyBox('请先勾选要下载的文件或文件夹', 'success');
    }

    if (listCheckedIdsArray.length === 1) {
      if (listCheckedIdsArray[0].filePath) {
        window.location = Helper.fetchLinkHeader + 'download/' + listCheckedIdsArray[0].filePath;
      } else {
        Helper.notifyBox('抱歉, 请选择可下载的文件(目前不支持文件夹下载)', 'danger');
      }
    } else if (listCheckedIdsArray.length > 1){
      // Helper.notifyBox('抱歉, 目前仅支持单个文件下载, 请选择一个可下载文件', 'danger');
      const fetchLink = Helper.fetchLinkHeader + 'downloadList';
      const params = {
        tasksIdList: listCheckedIdsArray,
      };
      fetch(fetchLink, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      }).then((response) => response.json())
        .then((json) => {
          if (json.success === '1' || json.success === 1) {
            console.log('Add downloadTask succeed');
            console.log(json.data);
            window.location = Helper.fetchLinkHeader + 'downloadByTaskId/' + json.data._id;
          }
        }).catch((ex) => {
          console.log(ex);
        })
    }


    // const fetchLink = Helper.fetchLinkHeader + 'download';
    // const params = {
    //   ids: listCheckedIdsArray,
    // }
    // fetch(fetchLink, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(params),
    //   credentials: 'include'
    // }).then((response) => {
    //   console.log(response);
    // }).catch((ex) => {
    //   console.log(ex);
    // })
  }

  isShowButtonGroup() {
    const currentDir = this.props.bodyContent.currentDir;
    if (currentDir.substr(0, 4) === '全部文件' || currentDir.substr(0, 5) === '/全部文件') {
      return true;
    }

    return false;
  }

  isTrashContent() {
    return this.props.menuAside.buttonActiveIndex === 5;
  }

  render() {
    const removeIconStyle = {
      position: 'absolute',
      left: '172px',
      top: '10.5px',
      cursor: 'pointer',
    }

    return (
      <div className="body-toolbar">
        <div className="button-group">
          {!this.isTrashContent() &&
              <button name="upload" type="button" className="btn btn-primary-outline" onClick={(e) => this.handleUploadFileButtonClick(e)}>
              <span className="glyphicon glyphicon-upload" aria-hidden="true"></span> 上传文件
              <input type="file" id="uploadFile" name="uploadfile" style={{display: 'none'}}
                onChange={(e) => this.handleUploadFileChange(e)}/>
            </button>
          }
          {this.isShowButtonGroup() &&
            <button name="newDirectory" type="button" className="btn btn-primary-outline" onClick={this.props.onToolBarButtonClick}>
              <span className="glyphicon glyphicon-folder-open" aria-hidden="true"></span> 新建文件夹</button>
          }
          {!this.isTrashContent() &&
            <button name="download" type="button" className="btn btn-primary-outline" onClick={(e) => this.handleDownloadButtonClick(e)}>
              <span className="glyphicon glyphicon-download" aria-hidden="true"></span> 下载</button>
          }
          {this.props.isItemsChecked &&
            <ToolBarButtonGroup
             bodyContent={this.props.bodyContent}
             menuAside={this.props.menuAside}
             onUpdateListItemContent={this.props.onUpdateListItemContent}
             onUpdateActiveLists={this.props.onUpdateActiveLists}
             onFetchData={this.props.onFetchData}/>}
        </div>
        <div className="search-bar">
          <input name="searchInfo"
            type="text"
            placeholder="输入文件名"
            value={this.state.searchInfo}
            onFocus={(e) => this.handleInputFocus(e)}
            onBlur={(e) => this.handleInputBlur(e)}
            onChange={(e) => this.handleSearchInfoChange(e)}></input>
          {this.state.searchInfo !== '' &&
           <span
             className="glyphicon glyphicon-remove"
             aria-hidden="true"
             style={removeIconStyle}
             onClick={(e) => this.handleRemoveIconClick(e)}>
             </span>}
          <button name="searchButton" type="button" className="btn btn-success-outline"
            onClick={(e) => this.handleSearchButtonClick(e)}>
            <span className="glyphicon glyphicon-search" aria-hidden="true"></span> 搜索</button>
        </div>
      </div>
    );
  }
}

export default BodyToolBar;
