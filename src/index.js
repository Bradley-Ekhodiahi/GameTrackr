import React from 'react';
import ReactDOM from 'react-dom';
import './styles/App.css';  // Import global styles
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')  // This is the "root" div in your HTML file
);