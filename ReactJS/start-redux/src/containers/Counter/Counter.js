import React from 'react'
import { connect } from 'react-redux'

import * as actionCreators from '../../store/actions'
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
    onIncrement: () => dispatch(actionCreators.increment()),
    onDecrement: () => dispatch(actionCreators.decrement()),
    onAddValue: () => dispatch(actionCreators.addValue(5)),
    onSubValue: () => dispatch(actionCreators.subValue(5)),
    onStoreResult: data => dispatch(actionCreators.storeResult(data)),
    onRemoveResult: id => dispatch(actionCreators.removeResult(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
