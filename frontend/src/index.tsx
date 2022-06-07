import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
// Material UI
import CssBaseline from '@mui/material/CssBaseline';
// Router
import { BrowserRouter } from "react-router-dom";
// Custom
import { Router } from './routes/Router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </React.StrictMode>
);
