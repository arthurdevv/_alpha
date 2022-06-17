import styled from 'styled-components';
import { theme } from '../../styles/global';

export const Container = styled.div`
  position: relative;
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.hover};
  background: ${theme.background};

  & svg {
    width: 8rem;
    height: 8rem;
    fill: ${theme.background2};
  }
`;

export const Animation = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Triangle = styled.div`
  position: relative;
  display: inline-block;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 34px solid ${theme.hover};
  animation: anm-TL-17-move 1.4s ease infinite;

  @keyframes anm-TL-17-move {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(90deg);
    }
    50% {
      transform: rotateY(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
