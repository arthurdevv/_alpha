import React from 'react';
import Header from './Header';
import Loading from './Loading';
import Terminal from './Terminal';
import GlobalStyle, { Workspace } from '../styles/global';

const App: React.FC = () => {
  const [isLoading, setLoading] = React.useState(true);

  setTimeout(() => setLoading(false), 3000);

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
