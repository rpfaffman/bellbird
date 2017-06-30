import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postAlarm, syncAlarms, upvoteAlarm } from 'modules/alarms/actions';

import './app.scss';

class App extends Component {
  constructor(props) {
    super(props)
    this.onInputKeyDown = this.onInputKeyDown.bind(this);
    this.renderAlarms = this.renderAlarms.bind(this);
    this.renderAlarmForm = this.renderAlarmForm.bind(this);
    this.syncAlarms = this.syncAlarms.bind(this);
  }

  componentDidMount() {
    setInterval(this.syncAlarms, 1000);
  }

  onInputKeyDown(e) {
    if (e.keyCode === 13) {
      this.props.dispatch(postAlarm(e.target.value));
    }
  }

  syncAlarms() {
    this.props.dispatch(syncAlarms());
  }

  upvoteAlarm(alarmId) {
    this.props.dispatch(upvoteAlarm(alarmId));
  }

  render () {
    return (
      <div>
        {this.renderAlarmForm()}
        {this.renderAlarms()}
      </div>
    );
  }

  renderAlarms() {
    return this.props.alarms.map((alarm, index) => {
      return (
        <div key={index}>
          {alarm.content}
          {' - '}
          <span onClick={() => this.upvoteAlarm(alarm.id)}>{'[upvote]'}</span>
        </div>
      )
    })
  }

  renderAlarmForm() {
    return (
      <input
        ref={ref => this.input = ref} type="text"
        onKeyDown={this.onInputKeyDown}
      />
    )
  }
}

function mapStateToProps (state) {
  return {
    alarms: state.alarms
  };
}

export default connect(mapStateToProps)(App);
