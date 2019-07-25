import { combineReducers } from 'redux'
import count from './count'
import result from './result'

export default combineReducers({
  cnt: count,
  res: result
})
