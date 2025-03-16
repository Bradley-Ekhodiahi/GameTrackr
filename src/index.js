import React from "react"; // imports React
import ReactDOM from "react-dom/client"; // lets React render components into the dom 
import "./index.css"; // import global css styles
import './styles/styles.css'; // import more styles
import App from './App.js'; // import app.js which is the root of the app

// create the root element and render the App component.
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

