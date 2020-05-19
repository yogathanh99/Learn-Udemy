import React from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WrapperThumbUp = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 1rem;

  & > :nth-child(2) {
    margin-left: 5px;
    margin-bottom: 4px;
    &:hover {
      color: #0d98ba;
    }
  }
`;

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

const LyricList = ({ lyrics }) => {
  const [likeLyric] = useMutation(mutation);
  const handleThumbUp = (id, likes) => {
    likeLyric({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1,
        },
      },
    });
  };

  return (
    <>
      {lyrics.length > 0 ? (
        <>
          {lyrics.map((lyric) => (
            <Wrapper key={lyric.id}>
              <p>{lyric.content}</p>
              <WrapperThumbUp>
                <p>{lyric.likes}</p>
                <ThumbUpIcon
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleThumbUp(lyric.id, lyric.likes)}
                />
              </WrapperThumbUp>
            </Wrapper>
          ))}
        </>
      ) : null}
    </>
  );
};

export default LyricList;
