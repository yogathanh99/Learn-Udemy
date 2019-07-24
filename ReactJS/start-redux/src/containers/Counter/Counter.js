import React from 'react'
import { connect } from 'react-redux'

import * as actionsTypes from '../../store/actions'
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
    onIncrement: () => dispatch(actionsTypes.increment()),
    onDecrement: () => dispatch(actionsTypes.decrement()),
    onAddValue: () => dispatch(actionsTypes.addValue(5)),
    onSubValue: () => dispatch(actionsTypes.subValue(5)),
    onStoreResult: data => dispatch(actionsTypes.storeResult(data)),
    onRemoveResult: id => dispatch(actionsTypes.removeResult(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
