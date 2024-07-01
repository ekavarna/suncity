// index.tsx or index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App';
import './index.css'; // Your global styles

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap your App component with BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
