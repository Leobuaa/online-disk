import React, { Component } from 'react'
import Helper from '../helper'
import AlertBox from './AlertBox'
import ReactDOM from 'react-dom'

class CompleteDeleteButton extends Component {
  handleCompleteDeleteButtonClick(event) {
    event.target.blur();
    const activeLists = this.props.activeLists;
    const listCheckedIds = this.props.listCheckedIds;

    const confirmClick = () => {
      const fetchLink = Helper.fetchLinkHeader + 'completeDelete';
      const params = {
        ids: listCheckedIds,
      };
      fetch(fetchLink, {
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
              for (let _id of listCheckedIds) {
                if (_id === obj._id) {
                  return false;
                }
              }
              return true;
            }));
            Helper.notifyBox('永久删除 ' + json.data.numberOfRemovedDocs.n + ' 个文件成功', 'success');
          } else {
            Helper.notifyBox('抱歉, 永久删除失败, 请重试.', 'danger');
          }
        }).catch((ex) => {
          console.log(ex);
          Helper.notifyBox('抱歉, 永久删除失败, 请重试.', 'danger');
        })
    }

    const alertMessage = '确定要永久删除已选的' + listCheckedIds.length + '个文件吗?' + '(请谨慎操作)';
    ReactDOM.render(<AlertBox alertTitle="确认永久删除" alertMessage={alertMessage} confirm={confirmClick}/>,
                 document.getElementById('alertBox'));
  }

  render() {
    return (
      <button name="completeDelete" type="button" className="btn btn-primary-outline"
        onClick={(e) => this.handleCompleteDeleteButtonClick(e)}>
        <span className="glyphicon glyphicon-trash" aria-hidden="true"></span> 永久删除
      </button>
    )
  }
}

export default CompleteDeleteButton
