import React, { Component } from 'react';
import ToolBarButtonGroup from './ToolBarButtonGroup.js';
import Helper from '../helper.js';
import uniqid from 'uniqid';

class BodyToolBar extends Component {
  constructor(props) {
    super(props);
  }

  handleInputFocus(event) {
    event.target.placeholder = '';
  }

  handleInputBlur(event) {
    if (event.target.name === 'searchInfo') {
      event.target.placeholder = '输入文件名';
    }
  }

  handleRemoveIconClick(event) {
    this.props.onClearSearchInfo();
  }

  handleUploadFileButtonClick(event) {
    const fileInput = document.getElementById('uploadFile');
    fileInput.click();
  }

  handleUploadFileChange(event) {
    // Current, One file; Todo, more files.
    const file = event.target.files[0];
    console.log(file);
    let newItem = {
      id: uniqid(),
      parentId: this.props.bodyContent.currentDirId,
      title: file.name,
      size: file.size + ' Bytes',
      updatedAt: Helper.dateFormat(new Date()),
      type: 'file',
      isEdit: false,
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
          <button name="upload" type="button" className="btn btn-primary-outline" onClick={(e) => this.handleUploadFileButtonClick(e)}>
            <span className="glyphicon glyphicon-upload" aria-hidden="true"></span> 上传文件
            <input type="file" id="uploadFile" name="uploadfile" style={{display: 'none'}}
              onChange={(e) => this.handleUploadFileChange(e)}/>
          </button>
          <button name="newDirectory" type="button" className="btn btn-primary-outline" onClick={this.props.onToolBarButtonClick}>
            <span className="glyphicon glyphicon-folder-open" aria-hidden="true"></span> 新建文件夹</button>
          <button name="download" type="button" className="btn btn-primary-outline" onClick={this.props.onToolBarButtonClick}>
            <span className="glyphicon glyphicon-download" aria-hidden="true"></span> 下载</button>
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
            value={this.props.bodyToolBar.searchInfo}
            onFocus={(e) => this.handleInputFocus(e)}
            onBlur={(e) => this.handleInputBlur(e)}
            onChange={this.props.onToolBarSearchInfoChange}></input>
          {this.props.bodyToolBar.searchInfo !== '' &&
           <span
             className="glyphicon glyphicon-remove"
             aria-hidden="true"
             style={removeIconStyle}
             onClick={(e) => this.handleRemoveIconClick(e)}>
             </span>}
          <button name="searchButton" type="button" className="btn btn-success-outline" onClick={this.props.onToolBarButtonClick}>
            <span className="glyphicon glyphicon-search" aria-hidden="true"></span> 搜索</button>
        </div>
      </div>
    );
  }
}

export default BodyToolBar;
