import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginRegisterBlock from './components/LoginRegisterBlock.js';
import Header from './components/Header.js';
import MenuAside from './components/MenuAside.js';
import BodyToolBar from './components/BodyToolBar.js';
import BodyContent from './components/BodyContent.js';

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
      }
    };
  }

  handleLoginStateChange(isLogin) {
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

  render() {
    return (
      <div className="App">
        {!this.state.isLogin &&
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        }
        {this.state.isLogin ? (
          <div>
            <Header
              header={this.state.header}
              onHeaderLinkClick={(e) => this.handleHeaderLinkClick(e)}
              onLoginStateChange={(isLogin) => this.handleLoginStateChange(isLogin)}/>
            <MenuAside
              menuAside={this.state.menuAside}
              onMenuAsideButtonClick={(e) => this.handleMenuAsideButtonClick(e)}/>
            <BodyToolBar
              bodyToolBar={this.state.bodyToolBar}
              onToolBarButtonClick={(e) => this.handleToolBarButtonClick(e)}
              onToolBarSearchInfoChange={(e) => this.handleToolBarSearchInfoChange(e)}/>
            <BodyContent />
          </div>
        ) : (
          <LoginRegisterBlock onLoginStateChange={(isLogin) => this.handleLoginStateChange(isLogin)}/>
        )}
      </div>
    );
  }
}

export default App;
