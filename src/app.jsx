import React from 'react';
import { useRef, useState } from "react";



export default function App() {
    const [ipParts, setIpParts] = useState(["", "", "", ""]);


    function changeIP(index, e) {
        const value = e.target.value
        
        if (value.length <= 3) {
            const ip = [...ipParts];
            ip[index] = value;
            setIpParts(ip);
        }
        
        if (value.length == 3 && index != 3) {
            e.target.nextSibling.nextSibling.focus()
        }
    }

    function handleKeys(index, e) {
        const notAllowedKeys = ['-', '+', ".", 'ArrowUp', 'ArrowDown']
        const target = e.target

        if (notAllowedKeys.some(num => num == e.key)) {
            e.preventDefault()
            return
        }

        if (e.key == 'Backspace' && target.value.length == 0 && index != 0) {           
           target.previousSibling.previousSibling.focus()
           e.preventDefault()
        }        
    }


    function ping() {
        const ipAddress = ipParts.join(".");
        window.startPig.sendIP(ipAddress)
        
        window.startPig.onPing((line) => {
            console.log('ping line:', line);
        });
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
                        <input id="IPinput1" value={ipParts[0]} onChange={(e) => changeIP(0, e)} onKeyDown={(e) => handleKeys(0, e)}  type='number'/>
                        <span className="dot">.</span><input id="IPinput2" value={ipParts[1]} onChange={(e) => changeIP(1, e)} onKeyDown={(e) => handleKeys(1, e)} type='number'/>
                        <span className="dot">.</span><input id="IPinput3" value={ipParts[2]} onChange={(e) => changeIP(2, e)} onKeyDown={(e) => handleKeys(2, e)} type='number'/>
                        <span className="dot">.</span><input id="IPinput4" value={ipParts[3]} onChange={(e) => changeIP(3, e)} onKeyDown={(e) => handleKeys(3, e)} type='number'/>
                    </div>

                    <div className="field">
                        <input id="fileNameInput" type="text" placeholder=".."/>
                    </div>

                    <div className="field">
                        <input id="delayInput" type="number" placeholder="..." />
                    </div>
                </div>

                <button onClick={ping} id="startBtn" >Ping</button>
            </div>
        </div>
      <hr className="loading-line" />
    </div>
  );
}

