import React from 'react'
import { AppRegistry } from 'react-native'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './app/reducers/reducer'

import AppContainer from './app/containers/AppContainer'

// Only create this logger if we are in development mode.
const loggerMiddleware = createLogger({ })

function configureStore (initialState) {
  const enhancer = compose(applyMiddleware(thunkMiddleware, loggerMiddleware))
  return createStore(reducer, initialState, enhancer)
}

export const store = configureStore({})

// Hide the debugger warning
console.ignoredYellowBox = ['Remote debugger']

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
)

AppRegistry.registerComponent('UniNinja', () => App)
