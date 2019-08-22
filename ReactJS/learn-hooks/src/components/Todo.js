import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todo = props => {
  const [inputState, inputSetState] = useState('');
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    axios
      .get('https://test-hooks-85b9d.firebaseio.com/todos.json')
      .then(res => {
        const todoData = res.data;

        const todos = [];
        for (let i in todoData) {
          todos.push({ id: i, name: todoData[i].name });
        }

        setTodoList(todos);
      });
  });

  const todoAddHandler = () => {
    setTodoList(todoList.concat(inputState));

    axios
      .post('https://test-hooks-85b9d.firebaseio.com/todos.json', {
        name: inputState,
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    inputSetState('');
  };

  return (
    <React.Fragment>
      <input
        placeholder="Input here"
        type="text"
        onChange={e => inputSetState(e.target.value)}
        value={inputState}
      />
      <button type="button" onClick={todoAddHandler}>
        Add
      </button>
      <ul>
        {todoList.map(todo => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Todo;
