import React, { Component } from 'react';
import UserInfoContent from './UserInfoContent.js';
import Helper from '../helper.js';

class UserInfoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compeletedVal: '80',
    }
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
              aria-valuenow={this.state.compeletedVal}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{width: this.state.compeletedVal + '%'}}>
              {this.state.compeletedVal + '%'}
            </div>
          </div>
        </div>
        <UserInfoContent />
      </div>
    );
  }
}

export default UserInfoCard;
