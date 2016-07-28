import 'whatwg-fetch';
// fetch is a global as per documentation
// need to import store to fetch auth token
import { initialStore as store } from '../.';

// const ACCESS_TOKEN = 'Ah6RxW9z5Suxiy8ttLmZDzN4_eHeyxf2SkXbH7XpCjg1.1469754000.W4YRexzkqzrCTUtoxiOsZTHRuZ58a8W1JcjrsoI5TrmMUKsyQs90wJoMz6nMtwsKNi15hRjqVZoUcaSMPOOYV-Mcihk1'
function request(authorization, url, method, body, suppliedHeaders = {}, removeAllHeaders) {
  const headers = removeAllHeaders ? {} : {
    ...authorization,
    ...suppliedHeaders,
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }

  const requestOptions = {
    method,
    headers
  }

  if (body) {
    requestOptions.body = JSON.stringify(body)
  }

  return fetch(url, requestOptions)
}

/**
  Some calls (cms) need to bypass auth header.
  In that case, do NOT attempt to getAuthorization,
  send back a resolved Promise with empty value.
*/
function getAuthorization(bypassAuth = false) {
  return Promise.resolve({ Authorization: `Bearer ${store.getState().auth.access_token}` })
}

export function get(url, headers = null, removeAllHeaders = false) {
  return getAuthorization(removeAllHeaders).then(authorization => request(authorization, url, 'GET', null, headers, removeAllHeaders))
}

export function post(url, body, headers = null, removeAllHeaders = false) {
  return getAuthorization(removeAllHeaders).then(authorization => request(authorization, url, 'POST', body, headers, removeAllHeaders))
}

export function put(url, body, headers = null, removeAllHeaders = false) {
  return getAuthorization(removeAllHeaders).then(authorization => request(authorization, url, 'PUT', body, headers, removeAllHeaders))
}

export function del(url, body, headers = null, removeAllHeaders = false) {
  return getAuthorization(removeAllHeaders).then(authorization => request(authorization, url, 'DELETE', body, headers, removeAllHeaders))
}

export function head(url, headers = null, removeAllHeaders = false) {
  return getAuthorization(removeAllHeaders).then(authorization => request(authorization, url, 'HEAD', null, headers, removeAllHeaders))
}
