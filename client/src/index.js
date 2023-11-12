import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
/*
  Naming Convention

  variable : CamelCase
  function : CamelCase 
  react Component : PascalCase
  css class : PascalCase


*/ 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

