import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import { ImagesProvider } from 'context/imagesProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ImagesProvider>
      <App />
    </ImagesProvider>
  </React.StrictMode>
);
