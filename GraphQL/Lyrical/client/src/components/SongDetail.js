import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import LyricCreate from './LyricCreate';
import LyricList from './LyricList';
import { fetchSong } from '../queries/fetch';

const SongDetail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(fetchSong, {
    variables: { id },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error}`;

  return (
    <div style={{ marginLeft: '20px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '40px', marginTop: '10px' }}>
        {data.song.title}
      </h1>
      <LyricList lyrics={data.song.lyrics} />
      <LyricCreate songID={id} />
    </div>
  );
};

export default SongDetail;
