// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Tailwind CSS styles
import { AuthProvider } from './context/AuthContext';
import { ComplaintsProvider } from './context/ComplaintsContext';
import { LostFoundProvider } from './context/LostFoundContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <ComplaintsProvider>
      <LostFoundProvider>
          <App />
          <ToastContainer position="top-center" autoClose={3000} />
        </LostFoundProvider>
      </ComplaintsProvider>
    </AuthProvider>
  </React.StrictMode>
);
