import React, {useState} from 'react';
import Person from './Person/Person'
import './App.css';

const App = props => {
  const [personState, personSetState] = useState({
    persons: [
      { name: "Thanh",age: 20},
      { name: "Thanh1", age:21}
    ]
  });

  const handleState = (newName) => {
    personSetState({
      persons: [
        { name: newName,age: 20},
        { name: "Thanh1", age: 22 }
      ]
    })
  }

  const changeValue = (e) => {
    personSetState({
      persons: [
        { name: e.target.value,age: 20},
        { name: "Thanh1", age: 23 }
      ]
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
      <button style={style} onClick={()=>handleState('Thanh2')}>Click me!</button>
      <Person change={changeValue} name={personState.persons[0].name} age={personState.persons[0].age}/>
      <Person click={() => handleState('Thanh3')} name={personState.persons[1].name} age={personState.persons[1].age}/>
    </div>
  );
}

export default App;
