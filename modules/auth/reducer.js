import * as types from './actionTypes';

export default function(state = '', action) {
  switch (action.type) {
    case types.ADD_TOKEN:
      return action.token;

    default:
      return state;
  }
}
