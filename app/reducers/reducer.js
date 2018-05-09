import * as types from '../actions/types'
import { combineReducers } from 'redux'

function favouriteUnisReducer (state = [], action) {
  if (action.type === types.FAVOURITE_UNI) {
    const favourites = [...state]

    for (let i = 0; i < favourites.length; i++) {
      if (action.uni.pubukprn === favourites[i].pubukprn) {
        // The specified uni is already in favourites, so remove it.
        favourites.splice(i, 1)
        return favourites
      }
    }

    // Otherwise, the uni is not in the favourites list, so add it.
    favourites.push(action.uni)

    return favourites
  } else {
    return state
  }
}

function uniLookupTableReducer (state = { isFetching: false, fetchFailed: false, lookupTable: {} }, action) {
  switch (action.type) {
    case types.REQUEST_UNI_LOOKUP_TABLE:
      return {...state,
        isFetching: true
      }
    case types.RECEIVE_UNI_LOOKUP_TABLE:
      return {...state,
        isFetching: false,
        fetchFailed: false,
        lookupTable: action.lookupTable
      }
    case types.UNI_LOOKUP_TABLE_NETWORK_ERR:
      return {...state,
        isFetching: false,
        fetchFailed: true
      }
    default:
      return state
  }
}

function backgroundColorReducer (state = 'red', action) {
  if (action.type === types.SET_BACKGROUND_COLOR) {
    return action.color
  } else {
    return state
  }
}

// Toggle reduced colours

function toggleReducedColoursReducer (state = false, action) {
  if (action.type === types.TOGGLE_REDUCED_COLOURS) {
    return !state
  } else {
    return state
  }
}

export default combineReducers({
  favouriteUnis: favouriteUnisReducer,
  uniLookupTable: uniLookupTableReducer,
  backgroundColor: backgroundColorReducer,
  reducedColoursEnabled: toggleReducedColoursReducer
})
