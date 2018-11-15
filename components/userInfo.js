import React from 'react';
import PropTypes from 'prop-types';

class UserInfo extends React.Component {
  state = {}
  render() {
    return (
      <div>{this.props.email}</div>
    )
  }
}

UserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default UserInfo