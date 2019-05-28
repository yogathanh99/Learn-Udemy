import React from 'react'

import './Person.css'

const Person = props => {
  return (
    <div onClick={props.click} className="person">
      <p>I'm {props.name} and {props.age} years old</p>
      <input type='text' onChange={props.change} value={props.name}/>
    </div>
  )
}

export default Person