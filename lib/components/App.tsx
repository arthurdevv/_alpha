import React from 'react';
import Loading from './Loading';
import Header from './Header';
import Terminal from './Terminal';
import GlobalStyle, { Workspace } from '../styles/global';

const App: React.FC = () => {
  // Change this to true.
  const [isLoading, setLoading] = React.useState(false);

  setTimeout(() => setLoading(false), 2200);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Workspace>
          <Header />
          <Terminal />
        </Workspace>
      )}
      <GlobalStyle />
    </>
  );
};

export default App;
