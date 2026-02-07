import React from 'react';
import { useRef, useState } from "react";


export default function App() {
    const inputRef = useRef(null);
    const [ipSlice, setIpSlice] = useState("");


    function changeIP(e) {
        setIpSlice(e.target.value)
        if (e.target.value.length > 2) {
           console.log("stop")
        } 
    }


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
      
        <div className="content">
            <div id="settingsForm">
                <div className="inputWrapper">
                    <div className="field">
                        <input id="IPinput" value={ipSlice} ref={inputRef} onChange={changeIP} type='number' />
                        <span className="dot">.</span><input id="IPinput" maxLength={3} ref={inputRef} onChange={changeIP} type="text" />
                        <span className="dot">.</span><input id="IPinput" maxLength={3} ref={inputRef} onChange={changeIP} type="text" />
                        <span className="dot">.</span><input id="IPinput" maxLength={3} ref={inputRef} onChange={changeIP} type="text" />
                    </div>

                    <div className="field">
                        <input id="fileNameInput" type="text" placeholder=".."/>
                    </div>

                    <div className="field">
                        <input id="delayInput" type="number" placeholder="..." />
                    </div>
                </div>

                <button id="startBtn" disabled>Ping</button>
            </div>
        </div>
      <hr className="loading-line" />
    </div>
  );
}

