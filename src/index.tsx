import React from 'react';
import ReactDOM from 'react-dom/client';
import './firebase';
import App from './App';
import { PostProvider } from './hooks/PostContext';

const rootElement = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <PostProvider>
      <App />
    </PostProvider>
  </React.StrictMode>,
);
