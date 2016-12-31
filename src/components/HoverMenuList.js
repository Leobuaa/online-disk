import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AlertBox from './AlertBox.js';
import Helper from '../helper.js';
import RenameButton from './RenameButton';

class HoverMenuList extends Component {
  handleDeleteButtonClick(event) {
    event.target.blur();

    const activeLists = this.props.bodyContent.activeLists;
    const listCheckedIds = [this.props._id];

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

  handleRecoverButtonClick(event) {
    event.target.blur();
    const activeLists = this.props.bodyContent.activeLists;
    const listCheckedIds = [this.props._id];

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

  handleCompleteDeleteButtonClick(event) {
    event.target.blur();
    const activeLists = this.props.bodyContent.activeLists;
    const listCheckedIds = [this.props._id];

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
      <div className="hover-menu-list-wrapper btn-group">
        { this.props.isDelete ? (
            <button
              name="recover"
              type="button"
              className="btn btn-primary-outline"
              onClick={(e) => this.handleRecoverButtonClick(e)}>
              <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span> 恢复
            </button>
          ) : (
            <RenameButton listCheckedIds={[this.props._id]} activeLists={this.props.bodyContent.activeLists}
              onUpdateListItemContent={this.props.onUpdateListItemContent}
              onUpdateHoverMenuListId={this.props.onUpdateHoverMenuListId}/>
          )
        }
        { !this.props.isDelete &&
          <button name="delete" type="button" className="btn btn-primary-outline"
            onClick={(e) => this.handleDeleteButtonClick(e)}>
          <span className="glyphicon glyphicon-trash" aria-hidden="true" style={{position: 'relative', top: '2px'}}></span> 删除
          </button>
        }
        { this.props.isDelete &&
          <button name="delete" type="button" className="btn btn-primary-outline"
            onClick={(e) => this.handleCompleteDeleteButtonClick(e)}>
          <span className="glyphicon glyphicon-trash" aria-hidden="true" style={{position: 'relative', top: '2px'}}></span> 永久删除
          </button>
        }
      </div>
    );
  }
}

export default HoverMenuList;
