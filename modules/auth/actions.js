import 'whatwg-fetch';
import * as types from './actionTypes';

//SYNC
export function addToken(token) {
  return {
    type: types.ADD_TOKEN,
    token
  };
};

//ASYNC
export function getToken() {
  return dispatch => {
    const api = 'https://apiv2.vevo.com/oauth/token?client_id=67d63a8b4a90400d813969904d694272&client_secret=d82ad59122244d3396c738e163d07be1&grant_type=client_credentials'
    return fetch(api, {
      method: 'post',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => dispatch(addToken(json)));
  }
}
