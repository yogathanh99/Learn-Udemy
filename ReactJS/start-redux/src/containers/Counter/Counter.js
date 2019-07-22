import React from 'react'
import { connect } from 'react-redux'

import * as actionTypes from '../../store/actions'
import CounterControl from '../../components/CounterControl/CounterControl'
import CounterOutput from '../../components/CounterOutput/CounterOutput'

const Counter = props => {
  const {
    countRedux,
    resultRedux,
    onDecrement,
    onIncrement,
    onAddValue,
    onSubValue,
    onStoreResult,
    onRemoveResult
  } = props
  return (
    <div>
      <CounterOutput value={countRedux} />
      <CounterControl label="Increment" clicked={onIncrement} />
      <CounterControl label="Decrement" clicked={onDecrement} />
      <CounterControl label="Add 5" clicked={onAddValue} />
      <CounterControl label="Subtract 5" clicked={onSubValue} />
      <hr />
      <button onClick={() => onStoreResult(countRedux)}>Store Results</button>
      <ul>
        {resultRedux.map(result => (
          <li key={result.id} onClick={() => onRemoveResult(result.id)}>
            {result.value}
          </li>
        ))}
      </ul>
    </div>
  )
}

const mapStateToProps = ({ cnt, res }) => ({
  countRedux: cnt.count,
  resultRedux: res.results
})

const mapDispatchToProps = dispatch => {
  return {
    onIncrement: () => dispatch({ type: actionTypes.INCREMENT }),
    onDecrement: () => dispatch({ type: actionTypes.DECREMENT }),
    onAddValue: () => dispatch({ type: actionTypes.ADD_VALUE, value: 5 }),
    onSubValue: () => dispatch({ type: actionTypes.SUB_VALUE, value: 5 }),
    onStoreResult: data => dispatch({ type: actionTypes.STORE_RESULT, value: data }),
    onRemoveResult: id => dispatch({ type: actionTypes.REMOVE_RESULT, removeId: id })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
