import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import './styles/styles.css'; // if the file is in a subfolder
import App from './App.js';

// Create the root element and render the App component.
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

