import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginRegisterBlock from './components/LoginRegisterBlock.js';
import Header from './components/Header.js';
import MenuAside from './components/MenuAside.js';
import BodyToolBar from './components/BodyToolBar.js';
import BodyContent from './components/BodyContent.js';
import UserInfoCard from './components/UserInfoCard.js';
import NotifyBox from './components/NotifyBox.js';
import Helper from './helper.js';
import uniqid from 'uniqid';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLogin: false,
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
        bodyTitleIds: [],
        currentDir: '全部文件',
        currentDirId: 'root',
        sortStatus: {
          'title': -1, // -1 unsorted, 0 ascend, 1 descend
          'size': -1,
          'updatedAt': -1,
        },
      },
      userInfo: {
        username: '',
        avatarURL: 'https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/item/0945792c.jpg',
      },
    };
  }

  componentDidMount() {
    Helper.isLogin((state) => this.handleLoginStateChange(state));
    const userInfo = this.state.userInfo;
    userInfo.username = localStorage.username;
    userInfo.avatarURL = localStorage.avatarURL;
    this.setState({
      userInfo: userInfo
    });
  }

  getItemList() {
    const bodyContent = this.state.bodyContent;
    const menuAside = this.state.menuAside;
    let activeLists = [];
    let allLists = [];

    let fetchLink = Helper.fetchLinkHeader;
    if (menuAside.buttonActiveIndex === 5 && bodyContent.bodyTitleIds.length === 1) {
      fetchLink += 'getTrashItemList';
    } else {
      fetchLink += 'getItemList/' + bodyContent.currentDirId;
    }

    console.log(fetchLink);
    fetch(fetchLink, {
      method: 'GET',
      credentials: 'include',
    }).then((response) => response.json())
      .then((json) => {
        if (json.success === '1' || json.success === 1) {
          const data = json.data;
          // console.log(bodyContent.activeLists);
          data.map((obj) => {
            obj.isEdit = false;
            allLists.push(obj);
            activeLists.push(obj);
          });

          bodyContent.listCheckedIds = [];
          bodyContent.sortStatus = {
            'title': -1, // -1 unsorted, 0 ascend, 1 descend
            'size': -1,
            'updatedAt': -1,
          };
          bodyContent.activeLists = activeLists;
          bodyContent.allLists = allLists;

          this.setState({
            bodyContent: bodyContent
          });
        }
      }).catch((e) => {
        console.log(e);
      })
  }

  initState() {
    const bodyContent = this.state.bodyContent;
    bodyContent.allLists = [];
    bodyContent.activeLists = [];
    bodyContent.listCheckedIds = [];
    bodyContent.bodyTitleIds = [];
    let rootDir;
    try {
      rootDir = JSON.parse(localStorage.rootDir);
    } catch(e) {
      console.log('rootDir json ex: ', e);
    }

    if (rootDir) {
      bodyContent.currentDir = rootDir.title || '';
      bodyContent.currentDirId = rootDir._id || '';
      bodyContent.bodyTitleIds.push(rootDir._id);
    }

    bodyContent.currentDir = this.getMenuAsideButtonName();

    this.setState({
      header: {
        linkActiveIndex: 0,
        userMenuActiveIndex: -1,
      },
      bodyToolBar: {
        buttonActiveIndex: -1,
        searchInfo: '',
      },
      bodyContent: bodyContent,
    }, this.getItemList);
  }

  handleLoginStateChange(isLogin) {
    console.log(isLogin);
    this.setState({
      isLogin: isLogin
    }, this.initState);
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
      menuAside: menuAside,
    }, this.initState);
  }

  getMenuAsideButtonIndexByName(name) {
    const nameMap = {
      all: 0,
      image: 1,
      doc: 2,
      video: 3,
      music: 4,
      trash: 5,
    }
    if (isNaN(nameMap[name])) {
      return -1;
    }

    return nameMap[name];
  }

  getMenuAsideButtonName() {
    const nameMap = [
      '全部文件',
      '图片',
      '文档',
      '视频',
      '音乐',
      '回收站',
    ];

    return nameMap[this.state.menuAside.buttonActiveIndex] || '全部文件';
  }

  handleToolBarButtonClick(event) {
    const name = event.target.name;
    const bodyToolBar = this.state.bodyToolBar;
    const bodyContent = this.state.bodyContent;
    let activeLists = bodyContent.activeLists;
    let listCheckedIds = bodyContent.listCheckedIds;
    bodyToolBar.buttonActiveIndex = this.getToolBarButtonIndexByName(name);

    const callback = (newItem) => {
      activeLists.unshift(newItem);
      listCheckedIds.push(newItem.id);
      bodyContent.activeLists = activeLists;

      this.setState({
        bodyContent: bodyContent,
        bodyToolBar: bodyToolBar,
      }, () => {
        document.getElementById('input_text_' + activeLists[0].id).focus();
        document.getElementById('input_text_' + activeLists[0].id).select();
      });
    }

    // 新建文件夹
    if (bodyToolBar.buttonActiveIndex === 1) {
       let newItem = {
        id: uniqid(),
        parentId: bodyContent.currentDirId,
        title: '新建文件夹',
        size: '-',
        updatedAt: Helper.dateFormat(new Date()),
        type: 'directory',
        isEdit: true,
      };

      // console.log(activeLists);
      // update to the database.
      fetch(Helper.fetchLinkHeader + 'addItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem),
        credentials: 'include'
      })
        .then(function(response) {
          return response.json();
        }).then((json) => {
          console.log(json);
          if (json.success === 1 || json.success === '1') {
            callback(newItem);
          } else {
            // 用户未登录
            if (json.code === '110') {
              Helper.isLogin((state) => this.handleLoginStateChange(state));
            }
          }
        }).catch((ex) => {
          console.log(ex);
          Helper.notifyBox('新建文件夹失败, 请稍后重试.', 'danger');
        });
    }

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

  updateUserInfo(newUserInfo) {
    const userInfo = this.state.userInfo;
    for (let prop in newUserInfo) {
      userInfo[prop] = newUserInfo[prop];
      localStorage.setItem(prop, newUserInfo[prop]);
    }
    this.setState({
      userInfo: userInfo,
    });
  }

  updateListCheckedIds(id) {
    let listCheckedIds = this.state.bodyContent.listCheckedIds;
    const filterArray = listCheckedIds.filter((val) => val === id);
    if (filterArray.length > 0) {
      listCheckedIds = listCheckedIds.filter((val) => val !== id);
    } else {
      listCheckedIds.push(id);
    }

    console.log(listCheckedIds);

    const bodyContent = this.state.bodyContent;
    bodyContent.listCheckedIds = listCheckedIds;
    this.setState({
      bodyContent: bodyContent
    });
  }

  handleCurrentDirChange(currentDir, currentDirId) {
    const bodyContent = this.state.bodyContent;
    const bodyTitleIds = bodyContent.bodyTitleIds;
    const dirs = currentDir.split('/').filter((val) => val !== '');

    if (bodyTitleIds.length > dirs.length) {
      bodyTitleIds.length = dirs.length;
    } else {
      bodyTitleIds.push(currentDirId);
    }

    bodyContent.currentDirId = currentDirId;
    bodyContent.currentDir = currentDir;
    this.setState({
      bodyContent: bodyContent
    }, this.getItemList);
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
    }, () => {
      const inputText = document.getElementById('input_text_' + listItemContent.id);
      if (inputText) {
        inputText.focus();
        inputText.select();
      }
    });
  }

  updateActiveLists(activeLists) {
    const bodyContent = this.state.bodyContent;
    let listCheckedIds = bodyContent.listCheckedIds;

    listCheckedIds = listCheckedIds.filter((id) => {
      for (let obj of activeLists) {
        if (id === obj.id) {
          return true;
        }
        return false;
      }
    });

    bodyContent.activeLists = activeLists;
    bodyContent.listCheckedIds = listCheckedIds;

    this.setState({
      bodyContent: bodyContent
    });

    // Todo, update to the database
    Helper.notifyBox('更新成功', 'success');
  }

  render() {
    let appHeader = null;
    let appBody = null;

    if (!this.state.isLogin) {
      appHeader =
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>;
      appBody = <LoginRegisterBlock onLoginStateChange={(isLogin) => this.handleLoginStateChange(isLogin)}
                  onUpdateUserInfo={(newUserInfo) => this.updateUserInfo(newUserInfo)} />;
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
              onUserMenuButtonClick={(e) => this.handleUserMenuButtonClick(e)}
              userInfo={this.state.userInfo}/>
            <UserInfoCard userInfo={this.state.userInfo}
              onUpdateUserInfo={(newUserInfo) => this.updateUserInfo(newUserInfo)}/>
          </div>
      } else if (activeIndex === -1) {
        appBody =
          <div>
            <Header
              header={this.state.header}
              onHeaderLinkClick={(e) => this.handleHeaderLinkClick(e)}
              onLoginStateChange={(isLogin) => this.handleLoginStateChange(isLogin)}
              onUserMenuButtonClick={(e) => this.handleUserMenuButtonClick(e)}
              userInfo={this.state.userInfo}/>
            <MenuAside
              menuAside={this.state.menuAside}
              onMenuAsideButtonClick={(e) => this.handleMenuAsideButtonClick(e)}/>
            <BodyToolBar
              bodyToolBar={this.state.bodyToolBar}
              bodyContent={this.state.bodyContent}
              menuAside={this.state.menuAside}
              onToolBarButtonClick={(e) => this.handleToolBarButtonClick(e)}
              onToolBarSearchInfoChange={(e) => this.handleToolBarSearchInfoChange(e)}
              onClearSearchInfo={() => this.clearSearchInfo()}
              isItemsChecked={this.state.bodyContent.listCheckedIds.length > 0}
              onUpdateListItemContent={(listItemContent) => this.updateListItemContent(listItemContent)}
              onUpdateActiveLists={(activeLists) => this.updateActiveLists(activeLists)}
              onFetchData={() => this.getItemList()}/>
            <BodyContent
              bodyContent={this.state.bodyContent}
              searchInfo={this.state.bodyToolBar.searchInfo}
              listCheckedIds={this.state.bodyContent.listCheckedIds}
              onUpdateListCheckedIds={(id) => this.updateListCheckedIds(id)}
              onCurrentDirChange={(currentDir, currentDirId) => this.handleCurrentDirChange(currentDir, currentDirId)}
              onItemCheck={(e) => this.handleListItemCheck(e)}
              onItemsAllCheck={(e) => this.handleListItemsAllCheck(e)}
              onSortActiveLists={(comp, name) => this.sortActiveLists(comp, name)}
              onUpdateListItemContent={(listItemContent) => this.updateListItemContent(listItemContent)}
              onUpdateActiveLists={(activeLists) => this.updateActiveLists(activeLists)}/>
          </div>;
      } else {
        appBody =
          <div>
            <Header
              header={this.state.header}
              onHeaderLinkClick={(e) => this.handleHeaderLinkClick(e)}
              onLoginStateChange={(isLogin) => this.handleLoginStateChange(isLogin)}
              onUserMenuButtonClick={(e) => this.handleUserMenuButtonClick(e)}
              userInfo={this.state.userInfo}/>
          </div>;
      }
    }

    return (
      <div className="App">
        {appHeader}
        {appBody}
        <div id="alertBox"></div>
        <div id="notifyBox"></div>
        <div id="directoryBox"></div>
      </div>
    );
  }
}

export default App;
