import React from 'react';
import Person from './Person';

const persons = props =>
  props.persons.map((person, i) => (
    <Person
      change={e => props.changed(e, person.id)}
      click={() => props.deleted(i)}
      key={i}
      name={person.name}
      age={person.age}
    />
  ));

export default persons;
