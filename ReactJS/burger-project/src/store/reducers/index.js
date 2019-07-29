import { combineReducers } from 'redux'
import burgerBuilder from './burgerBuilder'
import order from './order'
import auth from './auth'

export default combineReducers({
  burgerBuilder,
  order,
  auth
})
