import * as actionTypes from '../actions/actionTypes'
import { updateObjet } from '../ultily'

const initState = {
  count: 0
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return updateObjet(state, { count: state.count + 1 })
    case actionTypes.DECREMENT:
      return updateObjet(state, { count: state.count - 1 })
    case actionTypes.ADD_VALUE:
      return updateObjet(state, { count: state.count + action.value })
    case actionTypes.SUB_VALUE:
      return updateObjet(state, { count: state.count - action.value })
    default:
      return state
  }
}

export default reducer
