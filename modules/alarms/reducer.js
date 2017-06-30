import { combineReducers } from 'redux';

import * as types from './actionTypes';

export default function alarms(state = [], action) {
  console.log('[!!!] - checking actin', action);
  switch (action.type) {
    case types.ADD_ALARM:
      return [...state].concat(action.alarm)
    case types.SET_ALARMS:
      return action.alarms.sort((a, b) => {
        return b.upvotecount - a.upvotecount
      });
    case types.UPVOTE_ALARM:
      return state
    default:
      return state;
  }
}
