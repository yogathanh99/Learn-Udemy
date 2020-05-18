import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { fetchSong } from '../queries/fetch';

const SongDetail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(fetchSong, {
    variables: { id },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error}`;

  return (
    <div>
      <h1>Song Detail</h1>
      <h3>{data.song.title}</h3>
      {data.song.lyrics.length !== 0 ? (
        <p>{data.song.lyrics[0].content}</p>
      ) : null}
    </div>
  );
};

export default SongDetail;
