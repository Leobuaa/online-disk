import React, { Component } from 'react'
import Helper from '../helper'

class RecoverButton extends Component {
  handleRecoverButtonClick(event) {
    event.target.blur();
    const activeLists = this.props.activeLists;
    const listCheckedIds = this.props.listCheckedIds;

    const params = {
      ids: listCheckedIds,
      isDelete: false,
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
          Helper.notifyBox('恢复成功', 'success');
        } else {
          Helper.notifyBox('恢复失败, 请重试', 'danger');
        }
      }).catch((ex) => {
        console.log(ex);
        Helper.notifyBox('恢复失败, 请重试', 'danger');
      })
  }

  render() {
    return (
      <button name="recover" type="button" className="btn btn-primary-outline"
        onClick={(e) => this.handleRecoverButtonClick(e)}>
        <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span> 恢复
      </button>
    )
  }
}

export default RecoverButton
