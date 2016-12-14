import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NotifyBox from './NotifyBox.js';
import Helper from '../helper.js';

class BodyContent extends Component {
  constructor(props) {
    super(props);
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

  itemIsChecked(id) {
    const listCheckedIds = this.props.listCheckedIds;
    const isChecked = listCheckedIds.filter((val) => val === id).length > 0;
    return isChecked;
  }

  handleWholeItemClick(event) {
    const id = event.target.dataset.id;
    const inputItem = document.getElementById('input_checkbox_' + id);
    //console.log(event.target);
    //console.log('click' + id);
    if (inputItem) {
      this.props.onUpdateListCheckedIds(id);
    }
  }

  handleBodyTitleLinkClick(event) {
    const dir = event.target.dataset.dir;
    const dirId = event.target.dataset.dirId
    this.props.onCurrentDirChange(dir, dirId);
  }

  getBodyTitle() {
    let currentDir = this.props.bodyContent.currentDir;
    const bodyTitleIds = this.props.bodyContent.bodyTitleIds;

    if (currentDir === '/') {
      currentDir = '/全部文件';
    }

    let dirs = currentDir.split('/').filter((val) => val !== '');
    // console.log(dirs);
    console.log('currentDir is: ' + currentDir);

    let dirsList = [];
    let dir = '';
    for (let i = 0; i < dirs.length - 1; i++) {
        dir += ('/' + dirs[i]);
        dirsList.push(
          <li key={dir}>
            <a
              href="#"
              data-dir={dir}
              data-dir-id={bodyTitleIds[i]}
              onClick={(e) => this.handleBodyTitleLinkClick(e)}>{dirs[i]}</a>
          </li>
        );
    }

    dirsList.push(
      <li className="active" key={dir + '/' + dirs[dirs.length - 1]}>
        {dirs[dirs.length - 1]}
      </li>
    );

    let bodyTitle =
      <ol className="breadcrumb">
        {dirsList}
      </ol>

    return bodyTitle;
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
    //event.stopPropagation();
    const id = event.target.dataset.id;
    const titleInputText = document.getElementById('input_text_' + id);
    const activeLists = this.props.bodyContent.activeLists;
    if (titleInputText) {
      const listItemContent = activeLists.filter((val) => val.id === id);
      if (listItemContent.length > 0) {
        listItemContent[0].title = titleInputText.value;
        listItemContent[0].isEdit = false;
        listItemContent[0].updatedAt = Helper.dateFormat(new Date());
        console.log('OK button click.');
        // Todo, update to the database
        fetch('http://localhost:3001/updateItem', {
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
    //event.stopPropagation();
    const id = event.target.dataset.id;
    const activeLists = this.props.bodyContent.activeLists;
    const listItemContent = activeLists.filter((val) => val.id === id);
    if (listItemContent.length > 0) {
      listItemContent[0].isEdit = false;
      this.props.onUpdateListItemContent(listItemContent[0]);
      console.log('Cancel button click. Update list item succeed!');
    }
  }

  handleDirectoryItemClick(event) {
    event.stopPropagation();
    const dir = event.target.dataset.dir;
    const dirId = event.target.dataset.dirId;
    this.props.onCurrentDirChange(dir, dirId);
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
        return obj.title;
      }
    }

    return (
      <div className="list-item-edit">
        <input
          id={"input_text_" + obj.id}
          type="text"
          defaultValue={obj.title}
          className="list-item-title"/>
        <button type="button" className="btn" data-id={obj.id} onClick={(e) => this.handleListItemOKButtonClick(e)}>
          <span className="glyphicon glyphicon-ok" data-id={obj.id}></span>
        </button>
        <button type="button" className="btn" data-id={obj.id} onClick={(e) => this.handleListItemCancelButtonClick(e)}>
          <span className="glyphicon glyphicon-remove" data-id={obj.id}></span>
        </button>
      </div>
    );
  }

  getFileLists() {
    let lists = this.props.bodyContent.activeLists;
    lists = this.filterLists(lists);

    return lists.map((obj) =>
      <li
        className={ "list-group-item " + (((id) => this.itemIsChecked(id))(obj.id) ? 'item-checked' : '') }
        key={obj.id}
        data-id={obj.id}
        onClick={(e) => this.handleWholeItemClick(e)}>
        <div className="check">
          <input
            id={'input_checkbox_' + obj.id}
            value={obj.id}
            type="checkbox"
            checked={((id) => this.itemIsChecked(id))(obj.id)}
            onChange={this.props.onItemCheck}/>
        </div>
        <div className="title" data-id={obj.id}>
           <span
             className={this.getIconOfListItem(obj.type)}
             aria-hidden="true"
             style={this.getIconStyleOfListItem(obj.type)}>
           </span>{this.getTitleOfListItem(obj)}</div>
        <div className="size" data-id={obj.id}>{obj.size}</div>
        <div className="updatedAt" data-id={obj.id}>{obj.updatedAt}</div>
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
              onClick={this.props.onItemsAllCheck}/>
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
          {this.getBodyTitle()}
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
