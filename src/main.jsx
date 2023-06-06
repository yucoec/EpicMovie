import React from 'react';
import ReactDOM from 'react-dom/client';
import Modal from "react-modal";
import App from './App.jsx';
import './index.css';

Modal.setAppElement("#root");
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
