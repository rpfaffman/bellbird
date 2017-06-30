import 'whatwg-fetch';
import * as types from './actionTypes';

export function syncAlarms(content) {
  return dispatch =>
    fetch('/api/alarms', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(json => {
        dispatch(setAlarms(json))
      });
};

export function postAlarm(content) {
  return dispatch =>
    fetch('/api/alarms', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content })
      })
      .then(res => res.json())
      .then(json => dispatch(addAlarm(json)));
};

export function upvoteAlarm(alarmId) {
  console.log('[!!!] - upvoting alarm', alarmId)
  return dispatch =>
    fetch('/api/upvotes', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ alarm_id: alarmId })
      })
      .then(res => res.json())
      .then(json => dispatch(incrementAlarmUpvotes(json)));
};

export function setAlarms(alarms) {
  return {
    type: types.SET_ALARMS,
    alarms
  };
};

export function addAlarm(alarm) {
  return {
    type: types.ADD_ALARM,
    alarm
  };
};

export function incrementAlarmUpvotes(upvote) {
  console.log('[!!!] - trying to do the thing')
  const result = {
    type: types.UPVOTE_ALARM,
    upvote
  };
  console.log('[!!!] - attempting to dispatch', result);
  return result
};
