import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class AlertBox extends Component {
  constructor(props) {
    super(props);
  }

  handleCancelButtonClick(event) {
    ReactDOM.render(<div></div>, document.getElementById('alertBox'));
  }

  handleConfirmButtonClick(event) {
    this.props.confirm();
    ReactDOM.render(<div></div>, document.getElementById('alertBox'));
  }

  render() {
    return (
      <div>
        <div className="alert-bg" onClick={(e) => this.handleCancelButtonClick(e)}>
        </div>
        <div className="alert-box">
          <div className="alert-title">
            <p>{this.props.alertTitle}</p>
          </div>
          <div className="alert-message">
            <p>{this.props.alertMessage}</p>
          </div>
          <div className="alert-button-group">
            <button type="button" className="btn btn-confirm" onClick={(e) => this.handleConfirmButtonClick(e)}>
              确定
            </button>
            <button type="button" className="btn btn-cancel" onClick={(e) => this.handleCancelButtonClick(e)}>
              取消
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AlertBox;
