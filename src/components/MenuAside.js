import React, { Component } from 'react';

class MenuAside extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }

  handleButtonClick(event) {
    const name = event.target.name;
    const index = this.getIndexByName(name);
    this.setState({
      index: index
    });
  }

  isActiveButton(index) {
    if (index === this.state.index) {
      return 'item-active';
    }
    return '';
  }

  getIndexByName(name) {
    let index = 0;
    switch (name) {
      case 'all':
        index = 0;
        break;
      case 'image':
        index = 1;
        break;
      case 'doc':
        index = 2;
        break;
      case 'video':
        index = 3;
        break;
      case 'music':
        index = 4;
        break;
      default:
    }
    return index;
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
        name={obj.name}
        type="button"
        className={'list-group-item list-item ' + this.isActiveButton(obj.index)}
        onClick={(e) => this.handleButtonClick(e)}>
          <span className={'glyphicon ' + obj.icon} aria-hidden="true"></span>
          {obj.chinese}
        </button>
    );

    return (
      <div className="menu-aside-wrapper">
        <div className="list-group menu-list" data-active-index={this.state.index}>
          {menuLists}
        </div>
      </div>
    )
  }
}

export default MenuAside;
