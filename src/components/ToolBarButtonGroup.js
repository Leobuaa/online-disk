import React, { Component } from 'react';

class ToolBarButtonGroup extends Component {
  constructor(props) {
    super(props);
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
          className="btn btn-primary-outline">
          <span className="glyphicon glyphicon-trash" aria-hidden="true"></span> 删除</button>
        <button
          name="rename"
          type="button"
          className="btn btn-primary-outline">重命名</button>
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
