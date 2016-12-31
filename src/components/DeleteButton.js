import React, { Component } from 'react'
import AlertBox from './AlertBox'
import Helper from '../helper'
import ReactDOM from 'react-dom'

class DeleteButton extends Component {
  handleDeleteButtonClick(event) {
    event.target.blur();
    const activeLists = this.props.activeLists;
    const listCheckedIds = this.props.listCheckedIds;
    const confirmClick = () => {
      const params = {
        ids: listCheckedIds,
        isDelete: true,
      };

      fetch(Helper.fetchLinkHeader + 'deleteItem', {
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
      <button name="delete" type="button" className="btn btn-primary-outline"
        onClick={(e) => this.handleDeleteButtonClick(e)}>
        <span className="glyphicon glyphicon-trash" aria-hidden="true"></span> 删除
      </button>
    )
  }
}

export default DeleteButton
