import React, { Component } from 'react';
import UserInfoContent from './UserInfoContent.js';
import Helper from '../helper.js';

class UserInfoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completedVal: '0',
    }
  }

  updateCompletedVal(val) {
    this.setState({
      completedVal: val,
    });

  }

  render() {
    return (
      <div className="user-info-card">
        <div className="user-profile-progress">
          <div className="progress-name">
            资料完善度:
          </div>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow={this.state.completedVal}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{width: this.state.completedVal + '%'}}>
              {this.state.completedVal + '%'}
            </div>
          </div>
        </div>
        <UserInfoContent onUpdateCompletedVal={(val) => this.updateCompletedVal(val)}
          userInfo={this.props.userInfo}
          onUpdateUserInfo={this.props.onUpdateUserInfo}/>
      </div>
    );
  }
}

export default UserInfoCard;
