import React from 'react';
import { AlphaIcon } from '../Icon';
import { Container, Animation } from './styles';

const Loading: React.FC = () => {
  return (
    <Container>
      <Animation>
        <AlphaIcon />
      </Animation>
    </Container>
  );
};

export default React.memo(Loading);
