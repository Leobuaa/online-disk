import React, { Component } from 'react';

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

  render() {
    return (
      <div className="hover-menu-list-wrapper btn-group">
        <button name="rename" type="button" className="btn btn-primary-outline"
          onClick={(e) => this.handleRenameButtonClick(e)}>
          重命名
        </button>
        <button name="delete" type="button" className="btn btn-primary-outline">
        <span className="glyphicon glyphicon-trash" aria-hidden="true" style={{position: 'relative', top: '2px'}}></span> 删除
        </button>
      </div>
    );
  }
}

export default HoverMenuList;
