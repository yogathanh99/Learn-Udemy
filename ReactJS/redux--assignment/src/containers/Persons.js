import React from 'react'
import { connect } from 'react-redux'

import Person from '../components/Person/Person'
import AddPerson from '../components/AddPerson/AddPerson'
import * as actionTypes from '../store/actions'

const Persons = props => {
  const { prs, onAddedPerson, onRemovedPerson } = props

  return (
    <div>
      <AddPerson personAdded={onAddedPerson} />
      {prs.map(person => (
        <Person
          key={person.id}
          name={person.name}
          age={person.age}
          clicked={() => onRemovedPerson(person.id)}
        />
      ))}
    </div>
  )
}

const mapStateToProps = ({ persons }) => ({
  prs: persons,
})

const mapDispatchToProps = dispatch => ({
  onAddedPerson: (name, age) => dispatch({ type: actionTypes.ADD_PERSON, name, age }),
  onRemovedPerson: id => dispatch({ type: actionTypes.REMOVE_PERSON, personId: id }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Persons)
