import { combineReducers } from 'redux';

import * as types from './actionTypes';

export default function user(state = null, action) {
  switch (action.type) {
    case types.ADD_USER_ID:
      return { id: action.id };
    default:
      return state;
  }
}
