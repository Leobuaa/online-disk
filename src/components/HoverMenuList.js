import React, { Component } from 'react';

class HoverMenuList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="hover-menu-list-wrapper btn-group">
        <button name="rename" type="button" className="btn btn-primary-outline">
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
