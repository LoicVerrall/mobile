import * as types from './types'
import * as Api from '../lib/Api'

export function favouriteUni (uni) {
  return {
    type: types.FAVOURITE_UNI,
    uni
  }
}

// Uni Lookup Table

export function requestUniLookupTable () {
  return {
    type: types.REQUEST_UNI_LOOKUP_TABLE
  }
}

export function receiveUniLookupTable (lookupTable) {
  return {
    type: types.RECEIVE_UNI_LOOKUP_TABLE,
    lookupTable
  }
}

export function reportUniLookupTableNetworkError () {
  return {
    type: types.UNI_LOOKUP_TABLE_NETWORK_ERR
  }
}

export function fetchUniLookupTable () {
  return function (dispatch) {
    dispatch(requestUniLookupTable())

    // We are now in the 'fetching' state.

    const query = '?query=query%20Query%20%7B%0A%20%20universities%20%7B%0A%20%20%20%20name%0A%20%20%20%20pubukprn%0A%20%20%7D%0A%7D'
    const url = Api.getEndpoint() + query

    return fetch(url, { // eslint-disable-line
      headers: {
        'Authorization': 'Basic ' + Api.getApiKey()
      }
    }).then(
      response => {
        if (response.ok) {
          response.json().then(json => {
            dispatch(receiveUniLookupTable(json.data.universities))
          })
        }
      }, error => {
        console.log('Network ERROR: ', error)
        dispatch(reportUniLookupTableNetworkError())
      }
    )
  }
}

// Reduced Colour Setting

export function toggleReducedColours () {
  return {
    type: types.TOGGLE_REDUCED_COLOURS
  }
}
