import React from 'react'
import './UserOutput.css'

const userOutput = props => {
  return (
    <div className='UserOutput'>
      <p>User: {props.userName}</p>
      <p>Hello</p>
    </div>
  )
}

export default userOutput