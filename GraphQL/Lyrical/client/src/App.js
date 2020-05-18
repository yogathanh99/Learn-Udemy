import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { Toolbar, Typography } from '@material-ui/core';
import styled from 'styled-components';

import SongList from './components/SongList';
import CreateSong from './components/CreateSong';
import SongDetail from './components/SongDetail';

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: black;
`;

function App() {
  return (
    <>
      <Toolbar style={{ background: '#90CAF9' }}>
        <LinkStyled to='/'>
          <Typography variant='h6'>Home</Typography>
        </LinkStyled>
      </Toolbar>
      <Switch>
        <Route exact path='/' component={SongList} />
        <Route path='/new-song' component={CreateSong} />
        <Route path='/songs/:id' component={SongDetail} />
        <Redirect to='/' />
      </Switch>
    </>
  );
}

export default App;
