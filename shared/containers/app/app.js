import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { add as enqueueVideo, reset as resetQueue } from 'modules/queue/actions';
import { getToken } from 'modules/auth/actions';
import { setUserId } from 'modules/users/actions';

import './app.scss';

class App extends Component {
  componentWillMount() {
    this.props.dispatch(getToken())
    this.props.dispatch(setUserId())
  }

  render () {
    const { state, dispatch, children } = this.props;

    return (
      <div>
        {children && React.cloneElement(children, { state, dispatch })}
      </div>
    );
  }
}

function mapStateToProps (state) {
  return { state };
}

export default connect(mapStateToProps)(App);
