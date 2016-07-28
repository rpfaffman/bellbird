import 'whatwg-fetch';
import * as types from './actionTypes';


export function setUserId() {
  return dispatch =>
    fetch('/api/user', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(json => dispatch(addUserId(json)));
};

export function addUserId(id) {
  return {
    type: types.ADD_USER_ID,
    id
  }
}
