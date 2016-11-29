import React, { Component } from 'react';

class BodyContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
     listCheckedIds: [],
    }
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

  handleListItemsAllCheck(event) {
    const checked = event.target.checked;
    let listCheckedIds = [];
    if (checked === true) {
      const lists = this.props.bodyContent.activeLists;
      for (let item of lists) {
        listCheckedIds.push(item.id);
      }
    }

    this.setState({
      listCheckedIds: listCheckedIds
    });

    console.log(listCheckedIds);
  }

  handleListItemCheck(event) {
    const value = event.target.value;
    const checked = event.target.checked;
    console.log(value);
    console.log(checked);
    let listCheckedIds = this.state.listCheckedIds;
    const filterArray = listCheckedIds.filter((val) => val === value);

    if (filterArray.length > 0 && checked === false) {
      listCheckedIds = listCheckedIds.filter((val) => val !== value);
    }

    if (filterArray.length === 0 && checked === true) {
      listCheckedIds.push(value);
    }

    this.setState({
      listCheckedIds: listCheckedIds
    });
    console.log(listCheckedIds);
  }

  itemIsChecked(id) {
    const listCheckedIds = this.state.listCheckedIds;
    const isChecked = listCheckedIds.filter((val) => val === id).length > 0;
    return isChecked;
  }

  render() {
    let lists = this.props.bodyContent.activeLists;
    lists = this.filterLists(lists);

    const fileLists = lists.map((obj) =>
      <li className="list-group-item" key={obj.id}>
        <div className="check">
          <input
            value={obj.id}
            type="checkbox"
            checked={((id) => this.itemIsChecked(id))(obj.id)}
            onChange={(e) => this.handleListItemCheck(e)}/>
        </div>
        <div className="title">{obj.title}</div>
        <div className="size">{obj.size}</div>
        <div className="updatedAt">{obj.updatedAt}</div>
      </li>
    );

    return (
      <div className="body-content">
        <div className="body-title">
          <p>全部文件</p>
          <ul className="list-group">
            <li className="list-group-item" key='listTitle'>
              <div className="check">
                <input
                  name="allCheck"
                  type="checkbox"
                  onClick={(e) => this.handleListItemsAllCheck(e)}/>
              </div>
              <div className="title">文件名</div>
              <div className="size">文件大小</div>
              <div className="updatedAt">修改时间</div>
            </li>
          </ul>
        </div>
        <div className="file-list">
          <ul className="list-group">
            {fileLists}
          </ul>
        </div>
      </div>
    );
  }
}

export default BodyContent;
