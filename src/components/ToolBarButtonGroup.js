import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AlertBox from './AlertBox.js';

class ToolBarButtonGroup extends Component {
  constructor(props) {
    super(props);
  }

  handleRenameButtonClick(event) {
    const activeLists = this.props.bodyContent.activeLists;
    const listCheckedIds = this.props.bodyContent.listCheckedIds;

    for (let id of listCheckedIds) {
      activeLists.map((obj) => {
        if (obj.id === id) {
          obj.isEdit = !obj.isEdit;
        }
        this.props.onUpdateListItemContent(obj);
      })
    }
  }

  handleDeleteButtonClick(event) {
    event.target.blur();
    ReactDOM.render(<AlertBox alertTitle="确认删除" alertMessage="确定要删除以下文件吗?"/>,
                 document.getElementById('alertBox'));
  }

  render() {
    return (
      <div className="btn-group check-btn-group">
        <button
          name="share"
          type="button"
          className="btn btn-primary-outline">
          <span className="glyphicon glyphicon-share" aria-hidden="true"></span> 分享</button>
        <button
          name="delete"
          type="button"
          className="btn btn-primary-outline"
          onClick={(e) => this.handleDeleteButtonClick(e)}>
          <span className="glyphicon glyphicon-trash" aria-hidden="true"></span> 删除</button>
        <button
          name="rename"
          type="button"
          className="btn btn-primary-outline"
          onClick={(e) => this.handleRenameButtonClick(e)}>重命名</button>
        <button
          name="moveTo"
          type="button"
          className="btn btn-primary-outline">移动到</button>
        <button
          name="copyTo"
          type="button"
          className="btn btn-primary-outline">复制到</button>
      </div>
    );
  }
}

export default ToolBarButtonGroup;
