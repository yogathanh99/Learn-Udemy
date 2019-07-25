import * as actionTypes from './actionTypes'

const saveResult = res => ({
  type: actionTypes.STORE_RESULT,
  value: res
})

export const storeResult = value => {
  return dispatch => {
    setTimeout(() => dispatch(saveResult(value)), 2000)
  }
}

export const removeResult = removeId => ({
  type: actionTypes.REMOVE_RESULT,
  removeId
})
