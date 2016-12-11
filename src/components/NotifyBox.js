import React, { Component } from 'react';

class NotifyBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="alert alert-success notify-box" role="alert">
        {this.props.notifyMessage}
      </div>
    )
  }
}

export default NotifyBox;
