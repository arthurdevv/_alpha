import React from 'react';
import { Container, Animation, Triangle } from './styles';

const Loading: React.FC = () => {
  return (
    <Container>
      <Animation>
        <Triangle />
      </Animation>
    </Container>
  );
};

export default React.memo(Loading);
