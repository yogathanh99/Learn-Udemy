import React from 'react'

const Person = props => {
  return (
    <div className="person">
      I'm {props.name} and {props.age} years old
    </div>
  )
}

export default Person