import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AlertBox from './AlertBox.js';
import DirectoryBox from './DirectoryBox.js';
import Helper from '../helper.js';
import RenameButton from './RenameButton';
import DeleteButton from './DeleteButton';
import RecoverButton from './RecoverButton';
import CompleteDeleteButton from './CompleteDeleteButton';

class ToolBarButtonGroup extends Component {
  handleMoveToButtonClick(event) {
    event.target.blur();
    const activeLists = this.props.bodyContent.activeLists;
    const listCheckedIds = this.props.bodyContent.listCheckedIds;
    ReactDOM.render(<DirectoryBox
                      type="moveTo"
                      alertTitle="移动到..."
                      listCheckedIds={listCheckedIds}
                      onFetchData={this.props.onFetchData} />, document.getElementById('directoryBox'));
  }

  handleCopyToButtonClick(event) {
    event.target.blur();
    const activeLists = this.props.bodyContent.activeLists;
    const listCheckedIds = this.props.bodyContent.listCheckedIds;
    ReactDOM.render(<DirectoryBox
                      type="copyTo"
                      alertTitle="复制到..."
                      listCheckedIds={listCheckedIds}
                      onFetchData={this.props.onFetchData} />, document.getElementById('directoryBox'));
  }

  render() {
    const menuAside = this.props.menuAside;
    let renderBody;
    if (menuAside.buttonActiveIndex === 5) {
      renderBody = (
        <div className="btn-group check-btn-group">
          <RecoverButton listCheckedIds={this.props.bodyContent.listCheckedIds} activeLists={this.props.bodyContent.activeLists}
            onUpdateActiveLists={this.props.onUpdateActiveLists}/>
          <RenameButton listCheckedIds={this.props.bodyContent.listCheckedIds} activeLists={this.props.bodyContent.activeLists}
            onUpdateListItemContent={this.props.onUpdateListItemContent}/>
          <CompleteDeleteButton listCheckedIds={this.props.bodyContent.listCheckedIds} activeLists={this.props.bodyContent.activeLists}
            onUpdateActiveLists={this.props.onUpdateActiveLists}/>
        </div>
      )
    } else {
      renderBody = (
        <div className="btn-group check-btn-group">
          <button
            name="share"
            type="button"
            className="btn btn-primary-outline">
            <span className="glyphicon glyphicon-share" aria-hidden="true"></span> 分享</button>
          <DeleteButton listCheckedIds={this.props.bodyContent.listCheckedIds} activeLists={this.props.bodyContent.activeLists}
            onUpdateActiveLists={this.props.onUpdateActiveLists}/>
          <RenameButton listCheckedIds={this.props.bodyContent.listCheckedIds} activeLists={this.props.bodyContent.activeLists}
            onUpdateListItemContent={this.props.onUpdateListItemContent}/>
          <button
            name="moveTo"
            type="button"
            className="btn btn-primary-outline"
            onClick={(e) => this.handleMoveToButtonClick(e)}>移动到</button>
          <button
            name="copyTo"
            type="button"
            className="btn btn-primary-outline"
            onClick={(e) => this.handleCopyToButtonClick(e)}>复制到</button>
        </div>
      );
    }

    return renderBody;
  }
}

export default ToolBarButtonGroup;
