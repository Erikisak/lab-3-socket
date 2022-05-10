import SocketsProvider from "./context/socket.context"
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './index.css'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <SocketsProvider>
      <App />
    </SocketsProvider>
  </React.StrictMode>
);
