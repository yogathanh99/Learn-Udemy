import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import countReducer from './store/reducers/count'
import resultReducer from './store/reducers/result'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const rootReducers = combineReducers({
  cnt: countReducer,
  res: resultReducer
})

const store = createStore(rootReducers)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
