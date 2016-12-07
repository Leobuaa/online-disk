import React, { Component } from 'react';
import ToolBarButtonGroup from './ToolBarButtonGroup.js';

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
          <button name="upload" type="button" className="btn btn-primary-outline" onClick={this.props.onToolBarButtonClick}>
            <span className="glyphicon glyphicon-upload" aria-hidden="true"></span> 上传文件</button>
          <button name="newDirectory" type="button" className="btn btn-primary-outline" onClick={this.props.onToolBarButtonClick}>
            <span className="glyphicon glyphicon-folder-open" aria-hidden="true"></span> 新建文件夹</button>
          <button name="download" type="button" className="btn btn-primary-outline" onClick={this.props.onToolBarButtonClick}>
            <span className="glyphicon glyphicon-download" aria-hidden="true"></span> 下载</button>
          {this.props.isItemsChecked &&
            <ToolBarButtonGroup
             bodyContent={this.props.bodyContent}
             onUpdateListItemContent={this.props.onUpdateListItemContent}
             onUpdateActiveLists={this.props.onUpdateActiveLists}/>}
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
