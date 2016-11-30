import React, { Component } from 'react';

class UserInfoContent extends Component {
  constructor(props) {
    super(props);
  }

  handleEditButtonClick(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="user-info-content">
        <div className="user-avatar">
          <div className="user-avatar-editor-mask">

          </div>
          <img
            className="avatar-large"
            src="https://pic3.zhimg.com/v2-4aa340a64110c26e29db8057c339aac2_xll.jpg 2x"
            />
        </div>
        <div className="user-field-list">
          <div className="list-header">
            <h3>
              Leo Peng
            </h3>

          </div>

          <div className="user-filed-list-item">
              <form>
                <h4 className="field-label">性别</h4>
                <div className="field-content">
                  <span className="filed-text">
                    男
                  </span>
                  <button
                    name="genderButton"
                    className="btn"
                    onClick={(e) => this.handleEditButtonClick(e)}>
                    <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> 修改
                  </button>
                </div>
              </form>
          </div>
        </div>
      </div>
    );
  }
}

export default UserInfoContent;
