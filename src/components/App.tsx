import React from 'react';
import Header from './Header';
import Content from './Content';
import Gradient from './Gradient';
import { Container } from '@material-ui/core';

const App: CustomFC = () => {
  return (
    <>
      <Gradient />
      <Container style={{ height: '100%' }}>
        <Header />
        <Content />
      </Container>
    </>
  );
};

export default App;
