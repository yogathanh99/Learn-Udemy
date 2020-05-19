import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import FormCreate from './FormCreate';

const mutation = gql`
  mutation AddLyricToSong($content: String, $songID: ID) {
    addLyricToSong(content: $content, songId: $songID) {
      id
      title
      lyrics {
        id
        likes
        content
      }
    }
  }
`;

const LyricCreate = ({ songID }) => {
  const [content, setContent] = useState('');
  const [addLyricToSong] = useMutation(mutation);

  const handleSubmit = (e) => {
    e.preventDefault();
    addLyricToSong({
      variables: { content, songID },
    });
    setContent('');
  };
  return (
    <FormCreate
      handleSubmit={handleSubmit}
      value={content}
      setValue={setContent}
    />
  );
};

export default LyricCreate;
