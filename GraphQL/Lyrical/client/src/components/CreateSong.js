import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { Redirect, useHistory } from 'react-router-dom';

import { fetchSongs } from '../queries/fetch';

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

const CreateSong = () => {
  const [target, setTarget] = useState('');
  const [addSong, { data }] = useMutation(mutation);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    addSong({
      variables: { title: target },
      refetchQueries: [{ query: fetchSongs }],
    }).then(() => history.push('/'));
    setTarget('');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '10px' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label='Add new song'
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
      </form>
      {data ? (
        <Redirect push to='/' />
      ) : (
        <Button color='primary' onClick={handleSubmit}>
          Submit
        </Button>
      )}
    </div>
  );
};

export default CreateSong;
