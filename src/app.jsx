import React from 'react';
import { useRef, useState } from "react";



export default function App() {
    const [ipPartsList, setIpPartsList] = useState(
        Array.from({ length: 5 }, () => ["", "", "", ""])
    );


    function changeIP(y, x, e) {
        const value = e.target.value
        
        if (value.length <= 3) {
            const ipListCopy = [...ipPartsList];
            ipListCopy[y][x] = value;
            setIpPartsList(ipListCopy)
        }
        
        if (value.length == 3 && x != 3) {
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
                    {Array.from({ length: 5 }, (_, y) => (
                        <div key={y} className="field">
                            {Array.from({ length: 4 }, (_, x) => (
                                <React.Fragment key={x}>
                                    <input
                                        id={`ipPart${y}-${x}`}
                                        value={ipPartsList[y][x]}
                                        onChange={(e) => changeIP(y, x, e)}
                                        onKeyDown={(e) => handleKeys(x, e)}
                                        type="number"
                                    />

                                    {x < 3 && <span className="dot">.</span>}
                                </React.Fragment>
                            ))} 
                        </div>
                    ))}
                </div>

                <button onClick={ping} id="startBtn">Ping</button>
            </div>
        </div>
      <hr className="loading-line" />
    </div>
  );
}

