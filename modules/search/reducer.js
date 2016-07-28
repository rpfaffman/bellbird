import { combineReducers } from 'redux';

// import * as types from './actionTypes';

import * as SearchAction from './actions'
// import * as ResultsAction from '../actions/search/results'

function getInitialState() {
  return {
    form: {
      query: ''
    },
    results: {
      artists: [],
      videos: []
    }
  }
}

export default function searchReducer(state = getInitialState(), action) {
  switch (action.type) {
    case SearchAction.RESET:
      return getInitialState()
    default:
      return {
        ...state,
        form: formReducer(state.form, action),
        results: resultsReducer(state.results, action)
      }
  }
}

function formReducer(state, action) {
  switch (action.type) {
    case SearchAction.BUILD_QUERY:
      return {
        ...state,
        query: action.query
      }
    default:
      return state
  }
}

function resultsReducer(state = [], action) {
  switch (action.type) {
    case SearchAction.SET_RESULTS:
      return {
        ...state,
        artists: action.results.artists,
        videos: action.results.videos
      }
    default:
      return state
  }
}
