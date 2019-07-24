export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const ADD_VALUE = 'ADD'
export const SUB_VALUE = 'SUB'
export const STORE_RESULT = 'STORE_RESULT'
export const REMOVE_RESULT = 'REMOVE_RESULT'

export const increment = () => ({
  type: INCREMENT
})

export const decrement = () => ({
  type: DECREMENT
})

export const addValue = value => ({
  type: ADD_VALUE,
  value
})

export const subValue = value => ({
  type: SUB_VALUE,
  value
})

const saveResult = res => ({
  type: STORE_RESULT,
  value: res
})

export const storeResult = value => {
  return dispatch => {
    setTimeout(() => dispatch(saveResult(value)), 2000)
  }
}

export const removeResult = removeId => ({
  type: REMOVE_RESULT,
  removeId
})
