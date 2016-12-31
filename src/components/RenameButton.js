import React, { Component } from 'react';

class RenameButton extends Component {
  handleRenameButtonClick(event) {
    event.target.blur();
    const activeLists = this.props.activeLists;
    const listCheckedIds = this.props.listCheckedIds;

    for (let _id of listCheckedIds) {
      activeLists.forEach((obj) => {
        if (obj._id === _id) {
          obj.isEdit = !obj.isEdit;
          const listItemContent = {_id: obj._id, isEdit: obj.isEdit};
          this.props.onUpdateListItemContent(listItemContent);
          if (this.props.onUpdateHoverMenuListId) {
            this.props.onUpdateHoverMenuListId();
          }
        }
      })
    };
  }

  render() {
    return (
      <button name="rename" type="button" className="btn btn-primary-outline"
        onClick={(e) => this.handleRenameButtonClick(e)}>
        重命名
      </button>
    );
  }
}

export default RenameButton;
