import { combineReducers } from 'redux';

import * as types from './actionTypes';

export default function queue(state = [], action) {
  switch (action.type) {
    case types.SYNC:
      return action.queue;
    default:
      return state;
  }
}
