import * as actionTypes from '../actions/actionTypes'
import { updateObjet } from '../ultily'

const initState = {
  results: []
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      return updateObjet(state, {
        results: state.results.concat({ id: new Date(), value: action.value })
      })
    case actionTypes.REMOVE_RESULT:
      return updateObjet(state, {
        results: state.results.filter(result => result.id !== action.removeId)
      })
    default:
      return state
  }
}

export default reducer
