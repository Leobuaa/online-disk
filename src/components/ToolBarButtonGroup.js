import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AlertBox from './AlertBox.js';
import DirectoryBox from './DirectoryBox.js';
import Helper from '../helper.js';

class ToolBarButtonGroup extends Component {
  constructor(props) {
    super(props);
  }

  handleRenameButtonClick(event) {
    event.target.blur();
    const activeLists = this.props.bodyContent.activeLists;
    const listCheckedIds = this.props.bodyContent.listCheckedIds;

    for (let _id of listCheckedIds) {
      activeLists.forEach((obj) => {
        if (obj._id === _id) {
          obj.isEdit = !obj.isEdit;
          const listItemContent = {_id: obj._id, isEdit: obj.isEdit};
          this.props.onUpdateListItemContent(listItemContent);
        }
      })
    };
  }

  handleDeleteButtonClick(event) {
    event.target.blur();
    const activeLists = this.props.bodyContent.activeLists;
    const listCheckedIds = this.props.bodyContent.listCheckedIds;
    const listCheckedIdsArray = listCheckedIds.map((_id) => {
      for (let obj of activeLists) {
        if (obj._id === _id) {
          return {id: obj.id, parentId: obj.parentId};
        }
      }
    });
    const confirmClick = () => {

      const params = {
        ids: listCheckedIdsArray,
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
    const listCheckedIds = this.props.bodyContent.listCheckedIds;
    let listCheckedIdsArray = [];
    listCheckedIds.forEach((_id) => {
      for (let obj of activeLists) {
        if (obj._id === _id) {
          listCheckedIdsArray.push({
            id: obj.id,
            parentId: obj.parentId,
          });
        }
      }
    })


    const params = {
      ids: listCheckedIdsArray,
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

  handleMoveToButtonClick(event) {
    event.target.blur();
    const activeLists = this.props.bodyContent.activeLists;
    const listCheckedIds = this.props.bodyContent.listCheckedIds;
    const listCheckedIdsArray = listCheckedIds.map((_id) => {
      for (let obj of activeLists) {
        if (obj._id === _id) {
          return {id: obj.id, parentId: obj.parentId};
        }
      }
    })
    ReactDOM.render(<DirectoryBox
                      type="moveTo"
                      alertTitle="移动到..."
                      listCheckedIdsArray={listCheckedIdsArray}
                      onFetchData={this.props.onFetchData} />, document.getElementById('directoryBox'));
  }

  handleCopyToButtonClick(event) {
    event.target.blur();
    const activeLists = this.props.bodyContent.activeLists;
    const listCheckedIds = this.props.bodyContent.listCheckedIds;
    const listCheckedIdsArray = listCheckedIds.map((_id) => {
      for (let obj of activeLists) {
        if (obj._id === _id) {
          return {id: obj.id, parentId: obj.parentId};
        }
      }
    })
    ReactDOM.render(<DirectoryBox
                      type="copyTo"
                      alertTitle="复制到..."
                      listCheckedIdsArray={listCheckedIdsArray}
                      onFetchData={this.props.onFetchData} />, document.getElementById('directoryBox'));
  }

  handleCompleteDeleteButtonClick(event) {
    event.target.blur();
  }

  render() {
    const menuAside = this.props.menuAside;
    let renderBody;
    if (menuAside.buttonActiveIndex === 5) {
      renderBody = (
        <div className="btn-group check-btn-group">
          <button
            name="recover"
            type="button"
            className="btn btn-primary-outline"
            onClick={(e) => this.handleRecoverButtonClick(e)}>
            <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span> 恢复
          </button>
          <button
            name="rename"
            type="button"
            className="btn btn-primary-outline"
            onClick={(e) => this.handleRenameButtonClick(e)}>重命名
          </button>
          <button
            name="completeDelete"
            type="button"
            className="btn btn-primary-outline"
            onClick={(e) => this.handleCompleteDeleteButtonClick(e)}
            >
            <span className="glyphicon glyphicon-trash" aria-hidden="true"></span> 永久删除
          </button>
        </div>
      )
    } else {
      renderBody = (
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
            className="btn btn-primary-outline"
            onClick={(e) => this.handleMoveToButtonClick(e)}>移动到</button>
          <button
            name="copyTo"
            type="button"
            className="btn btn-primary-outline"
            onClick={(e) => this.handleCopyToButtonClick(e)}>复制到</button>
        </div>
      );
    }

    return renderBody;
  }
}

export default ToolBarButtonGroup;
