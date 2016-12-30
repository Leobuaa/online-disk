import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NotifyBox from './NotifyBox.js';
import Helper from '../helper.js';
import BodyTitle from './BodyTitle.js';
import HoverMenuList from './HoverMenuList.js';
import uniqid from 'uniqid';

class BodyContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverMenuListId: '',
    };
  }

  filterLists(lists) {
    let searchInfo = this.props.searchInfo;
    if (searchInfo === null || searchInfo === '') {
      return lists;
    }

    searchInfo = searchInfo.trim();
    const reg = /\s+/;
    const stringLists = searchInfo.split(reg);
    if (stringLists.length === 0) {
      return lists;
    }

    // Debug Info
    for (let str of stringLists) {
      console.log(str);
    }

    return lists.filter((obj) => {
      for (let str of stringLists) {
        str = str.trim();
        if (str === null || str === '') {
          return true;
        }

        let title = obj.title.toLowerCase();
        str = str.toLowerCase();
        if (title.search(str) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

  itemIsChecked(_id) {
    const listCheckedIds = this.props.listCheckedIds;
    const isChecked = listCheckedIds.filter((val) => val === _id).length > 0;
    return isChecked;
  }

  handleWholeItemClick(event) {
    const _id = event.target.dataset._id;
    const inputItem = document.getElementById('input_checkbox_' + _id);
    //console.log(event.target);
    //console.log('click' + id);
    if (inputItem) {
      this.props.onUpdateListCheckedIds(_id);
    }
  }

  handleBodyTitleLinkClick(event) {
    const dir = event.target.dataset.dir;
    const dirId = event.target.dataset.dirId
    this.props.onCurrentDirChange(dir, dirId);
  }

  handleListItemTitleClick(event) {
    const name = event.target.className;
    const sortStatus = this.props.bodyContent.sortStatus;
    const flag = sortStatus[name] === 0 ? 1 : -1;

    const comp = (a, b) => {
      if (a[name] < b[name]) {
        return flag;
      }
      if (a[name] > b[name]) {
        return -flag;
      }

      return 0;
    }
    this.props.onSortActiveLists(comp, name);
  }

  handleListItemOKButtonClick(event) {
    event.stopPropagation();
    const _id = event.target.dataset._id;
    const titleInputText = document.getElementById('input_text_' + _id);
    const activeLists = this.props.bodyContent.activeLists;
    const listCheckedIds = this.props.bodyContent.listCheckedIds;
    if (titleInputText) {
      const listItemContent = activeLists.filter((val) => val._id === _id);
      if (listItemContent.length > 0) {
        listItemContent[0].title = titleInputText.value;
        listItemContent[0].isEdit = false;
        listItemContent[0].updatedAt = Helper.dateFormat(new Date());
        console.log('OK button click.');
        // Todo, update to the database
        fetch(Helper.fetchLinkHeader + 'updateItem', {
          method: 'POST',
          body: JSON.stringify(listItemContent[0]),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((response) => response.json())
          .then((json) => {
            console.log(json);
            if (json.success === '1' || json.success === 1) {
              Helper.notifyBox('更新成功', 'success');
              this.props.onUpdateListItemContent(listItemContent[0]);
              listCheckedIds.find((element, index, array) => {
                if (element === listItemContent[0]._id) {
                  this.props.onUpdateListCheckedIds(element);
                }
              });
              console.log('Update list item succeed!')
            } else {
              Helper.notifyBox('更新失败, 请重试', 'danger');
            }

          }).catch((ex) => {
            console.log(ex);
            Helper.notifyBox('更新失败, 请重试', 'danger');
          })
      }
    }
  }

  handleListItemCancelButtonClick(event) {
    event.stopPropagation();
    const _id = event.target.dataset._id;
    const activeLists = this.props.bodyContent.activeLists;
    const listCheckedIds = this.props.bodyContent.listCheckedIds;
    const listItemContent = activeLists.filter((val) => val._id === _id);
    if (listItemContent.length > 0) {
      listItemContent[0].isEdit = false;
      this.props.onUpdateListItemContent(listItemContent[0]);
      listCheckedIds.find((element, index, array) => {
        if (element === listItemContent[0]._id) {
          this.props.onUpdateListCheckedIds(element);
        }
      });
      console.log('Cancel button click. Update list item succeed!');
    }
  }

  handleDirectoryItemClick(event) {
    event.stopPropagation();
    const dir = event.target.dataset.dir;
    const dirId = event.target.dataset.dirId;
    this.props.onCurrentDirChange(dir, dirId);
  }

  handleHoverMenuListClick(event) {
    event.stopPropagation();
    const _id = event.target.dataset._id;
    if (this.state.hoverMenuListId === _id) {
      this.setState({
        hoverMenuListId: ' ',
      });
    } else {
      this.setState({
        hoverMenuListId: _id,
      });
    }
  }

  handleMouseLeaveItem(event) {
    const activeLists = this.props.bodyContent.activeLists;

    let flag = true;

    activeLists.forEach((obj) => {
      if (obj.isEdit === true) {
        flag = false;
        return false;
      }
    })

    if (flag) {
      this.setState({
        hoverMenuListId: ' '
      });
    }
  }

  handleTitleChange(event) {
    const activeLists = this.props.bodyContent.activeLists;
    const _id = event.target.dataset._id;
    const value = event.target.value;

    activeLists.forEach((obj) => {
      if (obj._id === _id) {
        obj.unSavedTitle = value;
        this.props.onUpdateListItemContent(obj);
        return false;
      }
    })
  }

  updateHoverMenuListId(_id) {
    if (!_id) {
      _id = ' ';
    }

    this.setState({
      hoverMenuListId: _id,
    });
  }

  getIconOfListItem(type) {
    const icons = {
      'directory': 'glyphicon glyphicon-folder-open',
      'film': 'glyphicon glyphicon-film',
      'file': 'glyphicon glyphicon-file',
    }

    return icons[type] || icons.file;
  }

  getIconStyleOfListItem(type) {
    let iconStyle = {
      color: '#8183f1',
      fontSize: '20px',
      position: 'relative',
      top: '2px',
      marginRight: '12px'
    };

    if (type == 'directory') {
      iconStyle.color = '#7bd6fb';
    }

    return iconStyle;
  }

  getTitleOfListItem(obj) {
    const currentDir = this.props.bodyContent.currentDir;

    if (!obj.isEdit) {
      if (obj.type === 'directory') {
        return (
          <span
            style={{cursor: 'pointer'}}
            data-dir={currentDir + '/' + obj.title}
            data-dir-id={obj.id}
            onClick={(e) => this.handleDirectoryItemClick(e)}>
            {obj.title}
          </span>
        );
      } else {
        if (obj.filePath) {
          return (
            <a target="_blank" href={Helper.fetchLinkHeader + obj.filePath}>{obj.title}</a>
          )
        }
        return obj.title;
      }
    }

    return (
      <div className="list-item-edit">
        <input
          id={"input_text_" + obj._id}
          type="text"
          defaultValue={obj.title}
          className="list-item-title"/>
        <button type="button" className="btn" data-_id={obj._id} onClick={(e) => this.handleListItemOKButtonClick(e)}>
          <span className="glyphicon glyphicon-ok" data-_id={obj._id}></span>
        </button>
        <button type="button" className="btn" data-_id={obj._id} onClick={(e) => this.handleListItemCancelButtonClick(e)}>
          <span className="glyphicon glyphicon-remove" data-_id={obj._id}></span>
        </button>
      </div>
    );
  }

  getFileLists() {
    let lists = this.props.bodyContent.activeLists;
    lists = this.filterLists(lists);

    return lists.map((obj) =>
      <li
        className={ "list-group-item " + (((_id) => this.itemIsChecked(_id))(obj._id) ? 'item-checked' : '') }
        key={obj._id}
        data-_id={obj._id}
        onClick={(e) => this.handleWholeItemClick(e)}
        onMouseLeave={(e) => this.handleMouseLeaveItem(e)}>
        <div className="check">
          <input
            id={'input_checkbox_' + obj._id}
            value={obj._id}
            type="checkbox"
            checked={((_id) => this.itemIsChecked(_id))(obj._id)}
            onChange={this.props.onItemCheck}/>
        </div>
        <div className="title" data-_id={obj._id}>
           <span
             className={this.getIconOfListItem(obj.type)}
             aria-hidden="true"
             style={this.getIconStyleOfListItem(obj.type)}>
           </span>{this.getTitleOfListItem(obj)}
           {!obj.isEdit &&
           <span
             className="hover-menu-list glyphicon glyphicon-option-horizontal"
             aria-hidden="true"
             data-_id={obj._id}
             onClick={(e) => this.handleHoverMenuListClick(e)}></span>}
            {!obj.isEdit && (obj._id === this.state.hoverMenuListId) &&
              <HoverMenuList
                id={obj.id}
                _id={obj._id}
                isDelete={obj.isDelete}
                bodyContent={this.props.bodyContent}
                onUpdateListItemContent={this.props.onUpdateListItemContent}
                onUpdateHoverMenuListId={(_id) => this.updateHoverMenuListId(_id)}
                onUpdateActiveLists={this.props.onUpdateActiveLists}/>}
        </div>
        <div className="size" data-_id={obj._id}>{obj.size}</div>
        <div className="updatedAt" data-_id={obj._id}>{obj.updatedAt}</div>
      </li>
    );
  }

  getListGroupTitle() {
    const sortStatus = this.props.bodyContent.sortStatus;
    const arrowStyle = {
      color: '#0d79d1',
      fontSize: '12px',
      position: 'relative',
      top: '1px',
      left: '2px'
    };

    return (
      <ul className="list-group">
        <li className="list-group-item list-group-title" key='listTitle'>
          <div className="check">
            <input
              name="allCheck"
              type="checkbox"
              checked={this.props.bodyContent.allCheck}
              onChange={this.props.onItemsAllCheck}/>
          </div>
          <div className="title" onClick={(e) => this.handleListItemTitleClick(e)}>
            文件名
            { (sortStatus.title !== -1) &&
              <span
                className={"glyphicon glyphicon-arrow-" + (sortStatus.title === 0 ? "up" : "down") }
                aria-hidden="true"
                style={arrowStyle}></span> }</div>
          <div className="size"  onClick={(e) => this.handleListItemTitleClick(e)}>
            文件大小
            { (sortStatus.size !== -1) &&
              <span
                className={"glyphicon glyphicon-arrow-" + (sortStatus.size === 0 ? "up" : "down") }
                aria-hidden="true"
                style={arrowStyle}></span> }</div>
          <div className="updatedAt" onClick={(e) => this.handleListItemTitleClick(e)}>
            修改时间
            { (sortStatus.updatedAt !== -1) &&
              <span
                className={"glyphicon glyphicon-arrow-" + (sortStatus.updatedAt === 0 ? "up" : "down") }
                aria-hidden="true"
                style={arrowStyle}></span> }</div>
        </li>
      </ul>
    );
  }

  render() {
    return (
      <div className="body-content">
        <div className="body-title">
          <BodyTitle
            currentDir={this.props.bodyContent.currentDir}
            bodyTitleIds={this.props.bodyContent.bodyTitleIds}
            handleBodyTitleLinkClick={(e) => this.handleBodyTitleLinkClick(e)}
          />
          {this.getListGroupTitle()}
        </div>
        <div className="file-list">
          <ul className="list-group">
            {this.getFileLists()}
          </ul>
        </div>
      </div>
    );
  }
}

export default BodyContent;
