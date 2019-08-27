import React, { useEffect, useReducer, useRef } from 'react';
import axios from 'axios';

const Todo = props => {
  // const [inputState, inputSetState] = useState('');
  // const [submittedTodo, setSubmittedTodo] = useState(null);
  //const [todoList, setTodoList] = useState([]);

  const todoInputRef = useRef('');

  const todoListReducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        return state.concat(action.payload);
      case 'SET':
        return action.payload;
      case 'REMOVE':
        return state.filter(todo => todo.id !== action.payload);
      default:
        return state;
    }
  };

  const [todoList, dispatch] = useReducer(todoListReducer, []);

  useEffect(() => {
    axios
      .get('https://test-hooks-85b9d.firebaseio.com/todos.json')
      .then(res => {
        const todoData = res.data;

        const todos = [];
        for (let i in todoData) {
          todos.push({ id: i, name: todoData[i].name });
        }

        // setTodoList(todos);
        dispatch({ type: 'SET', payload: todos });
      });
    return () => {
      console.log('Clean up');
    };
  }, []);

  // useEffect(() => {
  //   if (submittedTodo) {
  //     // setTodoList(todoList.concat(submittedTodo));
  //     dispatch({ type: 'ADD', payload: submittedTodo });
  //   }
  // }, [submittedTodo]);

  const todoAddHandler = () => {
    const inputState = todoInputRef.current.value;

    axios
      .post('https://test-hooks-85b9d.firebaseio.com/todos.json', {
        name: inputState,
      })
      .then(res => {
        const todoItem = { id: res.data.name, name: inputState };
        dispatch({ type: 'ADD', payload: todoItem });
        // setSubmittedTodo(todoItem);
      })
      .catch(err => console.log(err));
    // inputSetState('');
    todoInputRef.current.value = '';
  };

  const todoRemoveHandler = todoId => {
    axios
      .delete(`https://test-hooks-85b9d.firebaseio.com/todos/${todoId}.json`)
      .then(res => {
        dispatch({ type: 'REMOVE', payload: todoId });
      })
      .catch(err => console.log(err));
  };

  return (
    <React.Fragment>
      {/* <input
        placeholder='Input here'
        type='text'
        onChange={e => inputSetState(e.target.value)}
        value={inputState}
      /> */}
      {/* Using Refs to interact value */}
      <input placeholder='Input here' type='text' ref={todoInputRef} />
      <button type='button' onClick={todoAddHandler}>
        Add
      </button>
      <ul>
        {todoList.map(todo => (
          <li key={todo.id} onClick={() => todoRemoveHandler(todo.id)}>
            {todo.name}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Todo;
