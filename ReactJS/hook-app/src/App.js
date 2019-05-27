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

  const handleState = () => {
    personSetState({
      persons: [
        { name: "Thanh2",age: 20},
        { name: "Thanh1", age: 22 }
      ]
    })
  }

  return (
    <div className="App">
      <button onClick={handleState}>Click me!</button>
      <Person name={personState.persons[0].name} age={personState.persons[0].age}/>
      <Person name={personState.persons[1].name} age={personState.persons[1].age}/>
    </div>
  );
}

export default App;
