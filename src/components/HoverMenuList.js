import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AlertBox from './AlertBox.js';
import Helper from '../helper.js';

class HoverMenuList extends Component {
  constructor(props) {
    super(props);
  }

  handleRenameButtonClick(event) {
    event.target.blur();
    const activeLists = this.props.bodyContent.activeLists;
    const id = this.props.id;

    activeLists.forEach((obj) => {
      if (obj.id === id) {
        obj.isEdit = true;
        this.props.onUpdateListItemContent(obj);
        this.props.onUpdateHoverMenuListId();
        return false;
      }
    });
  }

  handleDeleteButtonClick(event) {
    event.target.blur();

    const activeLists = this.props.bodyContent.activeLists;
    const listCheckedIds = [this.props.id];
    const listCheckedIdsArray = listCheckedIds.map((id) => {
      for (let obj of activeLists) {
        let res = {id: id};
        if (obj.id === id) {
          res.parentId = obj.parentId;
          return res;
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
      <div className="hover-menu-list-wrapper btn-group">
        <button name="rename" type="button" className="btn btn-primary-outline"
          onClick={(e) => this.handleRenameButtonClick(e)}>
          重命名
        </button>
        { !this.props.isDelete &&
          <button name="delete" type="button" className="btn btn-primary-outline"
            onClick={(e) => this.handleDeleteButtonClick(e)}>
          <span className="glyphicon glyphicon-trash" aria-hidden="true" style={{position: 'relative', top: '2px'}}></span> 删除
          </button>
        }
        { this.props.isDelete &&
          <button name="delete" type="button" className="btn btn-primary-outline"
            >
          <span className="glyphicon glyphicon-trash" aria-hidden="true" style={{position: 'relative', top: '2px'}}></span> 永久删除
          </button>
        }
      </div>
    );
  }
}

export default HoverMenuList;
