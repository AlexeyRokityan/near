import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css';

import App from './components/App';

import { Buffer } from 'buffer';
import ParentContext from './components/context';

global.Buffer = Buffer;

ReactDOM.render(
  <React.StrictMode>
    <ParentContext>
      <App />
    </ParentContext>
  </React.StrictMode>,
  document.getElementById('root')
);
