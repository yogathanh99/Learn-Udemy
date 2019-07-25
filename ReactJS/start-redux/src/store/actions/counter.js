import * as actionTypes from './actionTypes'

export const increment = () => ({
  type: actionTypes.INCREMENT
})

export const decrement = () => ({
  type: actionTypes.DECREMENT
})

export const addValue = value => ({
  type: actionTypes.ADD_VALUE,
  value
})

export const subValue = value => ({
  type: actionTypes.SUB_VALUE,
  value
})
