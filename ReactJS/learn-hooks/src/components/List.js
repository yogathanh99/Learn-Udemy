import React from 'react';

const List = props => {
  const { todoList, todoRemoveHandler } = props;

  console.log('Rendering list...');
  return (
    <ul>
      {todoList.map(todo => (
        <li key={todo.id} onClick={() => todoRemoveHandler(todo.id)}>
          {todo.name}
        </li>
      ))}
    </ul>
  );
};

export default List;
