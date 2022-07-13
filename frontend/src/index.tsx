import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
// Material UI
import CssBaseline from '@mui/material/CssBaseline';
// Custom
import { Router } from './routes/Router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
