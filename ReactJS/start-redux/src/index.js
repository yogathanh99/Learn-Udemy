import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import countReducer from './store/reducers/count'
import resultReducer from './store/reducers/result'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const rootReducers = combineReducers({
  cnt: countReducer,
  res: resultReducer
})

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
