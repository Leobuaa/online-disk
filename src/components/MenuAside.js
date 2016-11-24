import React, { Component } from 'react';

class MenuAside extends Component {
  constructor(props) {
    super(props);
  }

  isActiveButton(index) {
    if (index === this.props.menuAside.buttonActiveIndex) {
      return 'item-active';
    }
    return '';
  }

  render() {
    const lists = [
      {
        index: 0,
        name: 'all',
        icon: 'glyphicon-th-list',
        'chinese': '全部',
      },
      {
        index: 1,
        name: 'image',
        icon: 'glyphicon-picture',
        'chinese': '图片',
      },
      {
        index: 2,
        name: 'doc',
        icon: 'glyphicon-file',
        'chinese': '文档',
      },
      {
        index: 3,
        name: 'video',
        icon: 'glyphicon-facetime-video',
        'chinese': '视频',
      },
      {
        index: 4,
        name: 'music',
        icon: 'glyphicon-music',
        'chinese': '音乐',
      }
    ];

    const menuLists = lists.map((obj) =>
      <button
        key={obj.name}
        name={obj.name}
        type="button"
        className={'list-group-item list-item ' + this.isActiveButton(obj.index)}
        onClick={this.props.onMenuAsideButtonClick}>
          <span className={'glyphicon ' + obj.icon} aria-hidden="true"></span>
          {obj.chinese}
        </button>
    );

    return (
      <div className="menu-aside-wrapper">
        <div className="list-group menu-list" data-active-index={this.props.menuAside.buttonActiveIndex}>
          {menuLists}
        </div>
      </div>
    )
  }
}

export default MenuAside;
