import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ListItemText, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { fetchSongs } from '../queries/fetch';

const ListItemStyled = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.3);
  margin: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;

const AddIconStyled = styled(Link)`
  float: right;
  margin-right: 1rem;
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: black;
`;

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

const SongList = () => {
  const { loading, error, data } = useQuery(fetchSongs);
  const [deleteSong] = useMutation(mutation);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const handleRemove = (id) => {
    deleteSong({
      variables: { id },
      refetchQueries: [{ query: fetchSongs }],
    });
  };

  return (
    <div>
      {data.songs.map((song) => (
        <ListItemStyled key={song.id}>
          <LinkStyled to={`songs/${song.id}`}>
            <ListItemText primary={song.title} />
          </LinkStyled>
          <CancelIcon
            style={{ cursor: 'pointer' }}
            color='secondary'
            onClick={() => handleRemove(song.id)}
          />
        </ListItemStyled>
      ))}
      <AddIconStyled to='/new-song'>
        <Fab color='primary' aria-label='add'>
          <AddIcon />
        </Fab>
      </AddIconStyled>
    </div>
  );
};

export default SongList;
