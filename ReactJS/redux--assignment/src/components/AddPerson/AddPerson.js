import React, { useState } from 'react'

import './AddPerson.css'

const addPerson = props => {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const { personAdded } = props

  return (
    <div className="AddPerson">
      <input
        type="text"
        placeholder="Input your name:"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Input your age:"
        value={age}
        onChange={e => setAge(e.target.value)}
      />
      <button onClick={() => personAdded(name, age)}>Add Person</button>
    </div>
  )
}

export default addPerson
