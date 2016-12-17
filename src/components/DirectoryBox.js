import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class DirectoryBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDirId: '',
      currentDir: '全部文件',
      lists: [],
    }
  }

  componentDidMount() {
    let rootDir;
    try {
      rootDir = JSON.parse(localStorage.rootDir);
      if (rootDir) {
        this.setState({
          currentDirId: rootDir._id,
        }, this.fetchData);
      }
    } catch(e) {
      console.log('rootDir json ex: ', e);
    }

  }

  fetchData() {
    const fetchLink = 'http://localhost:3001/getItemList/' + this.state.currentDirId;
    fetch(fetchLink, {
      method: 'GET',
      credentials: 'include',
    }).then((response) => response.json())
      .then((json) => {
        if (json.success === '1' || json.success === 1) {
          this.setState({
            lists: json.data
          });
        }
      }).catch((ex) => {
        console.log(ex);
      })
  }

  handleCancelButtonClick(event) {
    event.stopPropagation();
    ReactDOM.render(<div></div>, document.getElementById('directoryBox'));
  }

  getDirectoryList() {
    const lists = this.state.lists;
    const directoryList = lists.map((obj) =>
      <li
        className="list-group-item"
        key={obj.id}>
        <div className="title">
          <span className="glyphicon glyphicon-folder-open folder-icon" aria-hidden="true"></span> 
          {obj.title}
        </div>
      </li>
    );

    return directoryList;
  }

  render() {
    return (
      <div>
        <div className="alert-bg" onClick={(e) => this.handleCancelButtonClick(e)}></div>
        <div className="directory-box">
          <div className="alert-title">
            <p>
              {this.props.alertTitle}
              <span
                className="glyphicon glyphicon-remove-circle cancel-icon"
                aria-hidden="true"
                onClick={(e) => this.handleCancelButtonClick(e)}></span>
            </p>
          </div>
          <div className="content">
            <div className="directory-title">

            </div>
            <div className="directory-list">
              <ul className="list-group">
                {this.getDirectoryList()}
              </ul>
            </div>
          </div>
          <div className="confirm-button">

          </div>
        </div>
      </div>
    )
  }
}

export default DirectoryBox;
