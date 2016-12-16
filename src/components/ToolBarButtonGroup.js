import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AlertBox from './AlertBox.js';
import Helper from '../helper.js';

class ToolBarButtonGroup extends Component {
  constructor(props) {
    super(props);
  }

  handleRenameButtonClick(event) {
    const activeLists = this.props.bodyContent.activeLists;
    const listCheckedIds = this.props.bodyContent.listCheckedIds;

    activeLists.map((obj) => {
      for (let id of listCheckedIds) {
        if (obj.id === id) {
          obj.isEdit = !obj.isEdit;
          this.props.onUpdateListItemContent(obj);
        }
      }
    });
  }

  handleDeleteButtonClick(event) {
    event.target.blur();
    const activeLists = this.props.bodyContent.activeLists;
    const listCheckedIds = this.props.bodyContent.listCheckedIds;
    const confirmClick = () => {

      const params = {
        ids: listCheckedIds,
        isDelete: true,
      };

      fetch('http://localhost:3001/deleteItem', {
        method: 'POST',
        body: JSON.stringify(params),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then((response) => response.json())
        .then((json) => {
          if (json.success === '1' || json.success === 1) {
            this.props.onUpdateActiveLists(activeLists.filter((obj) => {
              for (let id of listCheckedIds) {
                if (id === obj.id) {
                  return false;
                }
              }
              return true;
            }));
            Helper.notifyBox('删除成功', 'success');
          } else {
            Helper.notifyBox('删除失败, 请重试', 'danger');
          }
        }).catch((ex) => {
          console.log(ex);
          Helper.notifyBox('删除失败, 请重试', 'danger');
        })

    }
    const alertMessage = '确定要删除已选的' + listCheckedIds.length + '个文件吗?';
    ReactDOM.render(<AlertBox alertTitle="确认删除" alertMessage={alertMessage} confirm={confirmClick}/>,
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
