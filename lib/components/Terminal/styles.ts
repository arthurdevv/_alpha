import styled from 'styled-components';
import { theme } from '../../styles/global';

export const Container = styled.div`
  position: relative;
  width: 100vw;
  flex: 1 0 1%;
  overflow: hidden;
  color: ${theme.hover};
`;

export const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  display: flex;
  flex-direction: column;
`;

export const TerminalGroup = styled.div`
  position: relative;
  width: 100vw;
  height: 100%;
  z-index: 100;
  flex: 1 1 0;
  display: flex;
  flex-direction: column-reverse;

  .terminal-instance {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: -9999em;
    display: flex;
    overflow: hidden;
    flex: auto;
    background: ${theme.background2};

    .terminal-content {
      position: relative;
      margin: 0.938rem;
      overflow: hidden;
      display: block;
      flex: auto;
    }

    &.current {
      left: 0;
    }
  }
`;
