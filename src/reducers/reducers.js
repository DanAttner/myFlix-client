import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USER, SET_FULLUSER } from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;

    default:
      return state;
  }
}


function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;

    default:
      return state;
  }
}


function user(state = [], action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
      
    default:
      return state;
  }
}

function fulluser(state = [], action) {
  switch (action.type) {
    case SET_FULLUSER:
      return action.value;
      
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user,
  fulluser
});


export default moviesApp;