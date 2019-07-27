import { combineReducers } from 'redux'
import burgerBuilder from './burgerBuilder'
import order from './order'

export default combineReducers({
  burgerBuilder: burgerBuilder,
  order: order
})
