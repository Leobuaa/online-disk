import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginRegisterBlock from './components/LoginRegisterBlock.js';
import Header from './components/Header.js';
import MenuAside from './components/MenuAside.js';
import BodyToolBar from './components/BodyToolBar.js';
import BodyContent from './components/BodyContent.js';
import UserInfoCard from './components/UserInfoCard.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLogin: true,
      header: {
        linkActiveIndex: 0,
        userMenuActiveIndex: -1,
      },
      menuAside: {
        buttonActiveIndex: 0,
      },
      bodyToolBar: {
        buttonActiveIndex: -1,
        searchInfo: '',
      },
      bodyContent: {
        allLists: [],
        activeLists: [],
        listCheckedIds: [],
        currentDir: '/全部文件/生活大爆炸/第一季S01',
        sortStatus: {
          'title': -1, // -1 unsorted, 0 ascend, 1 descend
          'size': -1,
          'updatedAt': -1,
        },
      }
    };
  }

  componentDidMount() {
    const lists= [];
    const bodyContent = this.state.bodyContent;
    const size = 10;

    for (let i = 0; i < size; i++) {
      lists.push({
        id: i.toString(),
        title: '生活大爆炸',
        size: '223 MB',
        updatedAt: '2016-11-28 11:22:30',
        isEdit: false,
      });

      lists.push({
        id: (i + size).toString(),
        title: '神探夏洛克',
        size: '588 MB',
        updatedAt: '2016-11-28 12:20:11',
        isEdit: false,
      });

      lists.push({
        id: (i + size * 2).toString(),
        title: 'Fantatic Beasts and Where to Find Them',
        size: '2048 MB',
        updatedAt: '2016-11-29 12:20:11',
        isEdit: false,
      });

      lists.push({
        id: (i + size * 3).toString(),
        title: 'About Time',
        size: '3048 MB',
        updatedAt: '2016-11-30 12:20:11',
        isEdit: false,
      });

      lists.push({
        id: (i + size * 4).toString(),
        title: 'Harry Potter',
        size: '1059 MB',
        updatedAt: '2016-11-30 12:20:11',
        isEdit: false,
      });

      lists.push({
        id: (i + size * 5).toString(),
        title: '生活大爆炸S01',
        size: '-',
        updatedAt: '2016-12-04 11:11:11',
        type: 'directory',
        isEdit: true,
      });
    }

    bodyContent.allLists = lists;
    bodyContent.activeLists = lists;
    this.setState({
      bodyContent: bodyContent
    });
  }

  initState() {
    this.setState({
      isLogin: true,
      header: {
        linkActiveIndex: 0,
        userMenuActiveIndex: -1,
      },
      menuAside: {
        buttonActiveIndex: 0,
      },
      bodyToolBar: {
        buttonActiveIndex: -1,
        searchInfo: '',
      },
    });
  }

  handleLoginStateChange(isLogin) {
    this.initState();
    console.log(isLogin);
    this.setState({
      isLogin: isLogin
    });
  }

  handleHeaderLinkClick(event) {
    const titleClick = event.target.title;
    const header = this.state.header;
    if (titleClick === 'onlineDisk') {
      header.linkActiveIndex = 0;
    } else if (titleClick === 'share') {
      header.linkActiveIndex = 1;
    } else if (titleClick === 'more') {
      header.linkActiveIndex = 2;
    }

    header.userMenuActiveIndex = -1;

    this.setState({
      header: header
    });
  }

  handleUserMenuButtonClick(event) {
    const name = event.target.name;
    const header = this.state.header;
    if (name === 'userInfo') {
      header.userMenuActiveIndex = 0;
    } else if (name === 'help') {
      header.userMenuActiveIndex = 1;
    }

    this.setState({
      header: header
    });
  }

  handleMenuAsideButtonClick(event) {
    const name = event.target.name;
    const menuAside = this.state.menuAside;
    menuAside.buttonActiveIndex = this.getMenuAsideButtonIndexByName(name);
    this.setState({
      menuAside: menuAside
    });
  }

  getMenuAsideButtonIndexByName(name) {
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

  handleToolBarButtonClick(event) {
    const name = event.target.name;
    const bodyToolBar = this.state.bodyToolBar;
    bodyToolBar.buttonActiveIndex = this.getToolBarButtonIndexByName(name);
    this.setState({
      bodyToolBar: bodyToolBar
    });
  }

  handleToolBarSearchInfoChange(event) {
    const value = event.target.value;
    const bodyToolBar = this.state.bodyToolBar;
    bodyToolBar.searchInfo = value;
    this.setState({
      bodyToolBar: bodyToolBar
    });
  }

  getToolBarButtonIndexByName(name) {
    let index = -1;
    switch (name) {
      case 'upload':
        index = 0;
        break;
      case 'newDirectory':
        index = 1;
        break;
      case 'download':
        index = 2;
        break;
      case 'searchButton':
        index = 3;
        break;
      default:

    }
    return index;
  }

  handleListItemsAllCheck(event) {
    const checked = event.target.checked;
    let listCheckedIds = [];
    if (checked === true) {
      const lists = this.state.bodyContent.activeLists;
      for (let item of lists) {
        listCheckedIds.push(item.id);
      }
    }
    const bodyContent = this.state.bodyContent;
    bodyContent.listCheckedIds = listCheckedIds;
    this.setState({
      bodyContent: bodyContent
    });

    console.log(listCheckedIds);
  }

  handleListItemCheck(event) {
    const value = event.target.value;
    const checked = event.target.checked;
    console.log(value);
    console.log(checked);
    let listCheckedIds = this.state.bodyContent.listCheckedIds;
    const filterArray = listCheckedIds.filter((val) => val === value);

    if (filterArray.length > 0 && checked === false) {
      listCheckedIds = listCheckedIds.filter((val) => val !== value);
    }

    if (filterArray.length === 0 && checked === true) {
      listCheckedIds.push(value);
    }

    const bodyContent = this.state.bodyContent;
    bodyContent.listCheckedIds = listCheckedIds;
    this.setState({
      bodyContent: bodyContent
    });
    console.log(listCheckedIds);
  }

  updateListCheckedIds(id) {
    let listCheckedIds = this.state.bodyContent.listCheckedIds;
    const filterArray = listCheckedIds.filter((val) => val === id);
    if (filterArray.length > 0) {
      listCheckedIds = listCheckedIds.filter((val) => val !== id);
    } else {
      listCheckedIds.push(id);
    }

    const bodyContent = this.state.bodyContent;
    bodyContent.listCheckedIds = listCheckedIds;
    this.setState({
      bodyContent: bodyContent
    });
  }

  handleCurrentDirChange(currentDir) {
    const bodyContent = this.state.bodyContent;
    bodyContent.currentDir = currentDir;
    this.setState({
      bodyContent: bodyContent
    });
  }

  sortActiveLists(comp, name) {
    const activeLists = this.state.bodyContent.activeLists;
    activeLists.sort(comp);
    const bodyContent = this.state.bodyContent;
    bodyContent.activeLists = activeLists;
    bodyContent.sortStatus[name] = bodyContent.sortStatus[name] === 0 ? 1 : 0;
    this.setState({
      bodyContent: bodyContent
    });
  }

  clearSearchInfo() {
    const bodyToolBar = this.state.bodyToolBar;
    bodyToolBar.searchInfo = '';
    this.setState({
      bodyToolBar: bodyToolBar
    });
  }

  updateListItemContent(listItemContent) {
    const activeLists = this.state.bodyContent.activeLists;
    activeLists.forEach((obj) => {
      if (obj.id === listItemContent.id) {
        for (let props in obj) {
          obj[props] = listItemContent[props];
        }
      }
    });

    const bodyContent = this.state.bodyContent;
    bodyContent.activeLists = activeLists;
    this.setState({
      bodyContent: bodyContent,
    });
  }

  render() {
    let appHeader = null;
    let appBody = null;

    if (!this.state.isLogin) {
      appHeader =
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>;
      appBody = <LoginRegisterBlock onLoginStateChange={(isLogin) => this.handleLoginStateChange(isLogin)}/>;
    }

    if (this.state.isLogin) {
      const activeIndex = this.state.header.userMenuActiveIndex;
      if (activeIndex === 0) {
        appBody =
          <div>
            <Header
              header={this.state.header}
              onHeaderLinkClick={(e) => this.handleHeaderLinkClick(e)}
              onLoginStateChange={(isLogin) => this.handleLoginStateChange(isLogin)}
              onUserMenuButtonClick={(e) => this.handleUserMenuButtonClick(e)}/>
            <UserInfoCard />
          </div>
      } else if (activeIndex === -1) {
        appBody =
          <div>
            <Header
              header={this.state.header}
              onHeaderLinkClick={(e) => this.handleHeaderLinkClick(e)}
              onLoginStateChange={(isLogin) => this.handleLoginStateChange(isLogin)}
              onUserMenuButtonClick={(e) => this.handleUserMenuButtonClick(e)}/>
            <MenuAside
              menuAside={this.state.menuAside}
              onMenuAsideButtonClick={(e) => this.handleMenuAsideButtonClick(e)}/>
            <BodyToolBar
              bodyToolBar={this.state.bodyToolBar}
              onToolBarButtonClick={(e) => this.handleToolBarButtonClick(e)}
              onToolBarSearchInfoChange={(e) => this.handleToolBarSearchInfoChange(e)}
              onClearSearchInfo={() => this.clearSearchInfo()}
              isItemsChecked={this.state.bodyContent.listCheckedIds.length > 0}/>
            <BodyContent
              bodyContent={this.state.bodyContent}
              searchInfo={this.state.bodyToolBar.searchInfo}
              listCheckedIds={this.state.bodyContent.listCheckedIds}
              onUpdateListCheckedIds={(id) => this.updateListCheckedIds(id)}
              onCurrentDirChange={(currentDir) => this.handleCurrentDirChange(currentDir)}
              onItemCheck={(e) => this.handleListItemCheck(e)}
              onItemsAllCheck={(e) => this.handleListItemsAllCheck(e)}
              onSortActiveLists={(comp, name) => this.sortActiveLists(comp, name)}
              onUpdateListItemContent={(listItemContent) => this.updateListItemContent(listItemContent)}/>
          </div>;
      }
    }

    return (
      <div className="App">
        {appHeader}
        {appBody}
      </div>
    );
  }
}

export default App;
