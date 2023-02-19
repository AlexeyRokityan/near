import React from 'react';
import Header from './Header';
import Content from './Content';
import Gradient from './Gradient';
import { Container } from '@material-ui/core';
import WalletConnectSuccessModal from './Popup';

const App: CustomFC = () => {
  return (
    <>
      <Gradient />
      <Header />
      <Container style={{ height: '100%' }}>
        <Content />
      </Container>
      <WalletConnectSuccessModal />
    </>
  );
};

export default App;
