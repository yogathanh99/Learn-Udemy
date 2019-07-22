import * as actionTypes from '../actions'

const initState = {
  count: 0
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return {
        ...state,
        count: state.count + 1
      }
    case actionTypes.DECREMENT:
      return {
        ...state,
        count: state.count - 1
      }
    case actionTypes.ADD_VALUE:
      return {
        ...state,
        count: state.count + action.value
      }
    case actionTypes.SUB_VALUE:
      return {
        ...state,
        count: state.count - action.value
      }
    default:
      return state
  }
}

export default reducer
