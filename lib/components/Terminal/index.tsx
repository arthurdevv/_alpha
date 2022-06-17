import React from 'react';
import Watermark from '../Watermark';
import { Container, Wrapper, TerminalGroup } from './styles';

const Terminal: React.FC = () => {
  React.useEffect(() => {
    require('../../../app/Session');
  });

  return (
    <Container>
      <Wrapper>
        <TerminalGroup className="terminal-group" role="presentation" />
        <Watermark />
      </Wrapper>
    </Container>
  );
};

export default React.memo(Terminal);
