import React, {useState} from 'react';
import shortid from 'shortid'

import Person from './Person/Person'
import './App.css';

const App = props => {
  const [personState, personSetState] = useState({
    persons: [
      { id: shortid.generate(), name: "Thanh", age: 20},
      { id: shortid.generate(), name: "Thanh1", age:21}
    ],
    showPersons: true
  });

  const handleState = (newName) => {
    personSetState({
      persons: [
        { name: newName,age: 20},
        { name: "Thanh1", age: 22 }
      ],
      showPersons: personState.showPersons
    })
  }

  const changeValue = (e, id) => {
    const personIndex = personState.persons.findIndex(person => person.id === id)

    const person = { ...personState.persons[personIndex] }
    person.name = e.target.value

    const persons = [...personState.persons]
    persons[personIndex] = person
    
    personSetState({
      persons,
      showPersons: personState.showPersons
    })
  }

  const toggleHandle = () => {
    const status = personState.showPersons
    personSetState({persons: personState.persons, showPersons: !status})
  }

  const deletePerson = (personIndex) => {
    const persons= [...personState.persons]
    persons.splice(personIndex, 1)
    personSetState({
      persons,
      showPersons: personState.showPersons
    })
  }

  const style = {
    backgroundColor: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor: 'pointer'
  }

  return (
    <div className="App">
      <button style={style} onClick={() => handleState('Thanh2')}>Click me!</button>
      <button style={style} onClick={toggleHandle}>Toggle</button>
      { personState.showPersons ?
        <div>
          {
            personState.persons.map((person,i) => (
              <Person
                change={(e)=> changeValue(e, person.id)}
                click={() => deletePerson(i)}
                key={i} name={person.name}
                age={person.age} />
            ))
          }
          {/*<Person change={changeValue} name={personState.persons[0].name} age={personState.persons[0].age}/>
          <Person click={() => handleState('Thanh3')} name={personState.persons[1].name} age={personState.persons[1].age}/> */}
        </div> : null
      }
    </div>
  );
}

export default App;
