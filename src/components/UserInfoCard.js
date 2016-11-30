import React, { Component } from 'react';
import UserInfoContent from './UserInfoContent.js';

class UserInfoCard extends Component {
  constructor(props) {
    super(props);
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
              aria-valuenow="60"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{width: '60%'}}>
              60%
            </div>
          </div>
        </div>
        <UserInfoContent />
      </div>
    );
  }
}

export default UserInfoCard;
