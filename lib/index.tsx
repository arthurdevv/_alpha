import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyleSheetManager } from 'styled-components';

import App from './components/App';

const container = document.getElementById('alpha') as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <StyleSheetManager disableVendorPrefixes>
      <App />
    </StyleSheetManager>
  </React.StrictMode>,
);
