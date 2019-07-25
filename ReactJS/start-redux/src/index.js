import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import rootReducers from './store/reducers'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const logger = store => next => action => {
  console.log('[Middleware] Dispatching: ', action)
  const result = next(action)
  console.log('[Middleware] Next state: ', store.getState())
  return result
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducers, composeEnhancers(applyMiddleware(logger, thunk)))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
