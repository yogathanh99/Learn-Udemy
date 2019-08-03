import React from 'react';

const User = ({ name, age }) => {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <style jsx>{`
        div {
          border: 1px solid #eee;
          box-shadow: 0 2px 3px #ccc;
          padding: 2px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default User;
