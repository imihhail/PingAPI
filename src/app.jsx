import React from 'react';

export default function App() {
  return (
    <div>
      <header className="titlebar">
      <div className="titlebar-left">
        <div className="app-icon"></div>
      </div>

      <div className="titlebar-right">
        <button onClick={() => window.winapi.minimize()} id="minBtn" className="win-btn" title="Minimize">—</button>
        <button id="maxBtn" className="win-btn" title="Maximize" disabled>▢</button>
        <button onClick={() => window.winapi.close()} id="closeWin" className="win-btn close" title="Close">✕</button>
      </div>
      </header>
      <hr class="loading-line" />
      <h1>Hello — Electron + Vite + React (JavaScript)</h1>
    </div>
  );
}

