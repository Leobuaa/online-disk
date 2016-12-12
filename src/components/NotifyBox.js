import React, { Component } from 'react';

class NotifyBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={"alert notify-box " + "alert-" + this.props.type} role="alert">
        {this.props.notifyMessage}
      </div>
    )
  }
}

export default NotifyBox;
