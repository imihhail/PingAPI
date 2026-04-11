import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style/index.css';
import './style/topbar.css';
import './style/sidebar.css';
import './style/pingLog.css';
import App from './App/app';


const container = document.getElementById('root');
if (!container) throw new Error('Root element #root not found');

createRoot(container).render(
    <StrictMode>
        <App />
    </StrictMode>
);
