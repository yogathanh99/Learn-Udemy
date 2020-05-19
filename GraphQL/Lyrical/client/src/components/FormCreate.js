import React from 'react';
import { TextField } from '@material-ui/core';

const FormCreate = ({ handleSubmit, value, setValue }) => {
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label='Add new song'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
};

export default FormCreate;
