import styled, { createGlobalStyle } from 'styled-components';

export const theme = {
  color: 'rgba(153, 153, 153, 1.0)',
  hover: 'rgba(230, 230, 230, 1.0)',
  border: 'rgba(36, 36, 36, 1.0)',
  background: 'rgba(17, 17, 17, 1.0)',
  background2: 'rgba(21, 21, 21, 1.0)',
  scrollbar: 'rgba(255, 255, 255, 0.03)',
  scrollbarThumb: 'rgba(255, 255, 255, 0.09)',
  scrollbarHover: 'rgba(255, 255, 255, 0.15)',
};

export const Workspace = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  animation: 0.4s loading ease-out;

  @keyframes loading {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-rendering: optimizeLegibility;
  };

  html {
    line-height: 1.15;
    font-family: sans-serif;
    -webkit-text-size-adjust: 100%;
  };

  body {
    overflow: hidden;
    user-select: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #alpha {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    font: 400 16px 'Inter', sans-serif;
    background: ${theme.background};
  }

  ::-webkit-scrollbar {
    width: .5rem;
    background: ${theme.scrollbar};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.scrollbarThumb};

    &:hover {
      background: ${theme.scrollbarHover};
    }
  }
`;

export default GlobalStyle;
