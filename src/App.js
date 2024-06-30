import React from 'react';
import styled from 'styled-components';
import Main from './pages/Main';

function App() {
  return (
    <Container className="App">
      <Main />
    </Container>
  );
}

export default App;

const Container = styled.div`
  /* Add any styles as needed */
`;
