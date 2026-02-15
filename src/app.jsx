import React from 'react';
import { useRef, useState, useEffect } from "react";

const IP_LENGHT = 5


export default function App() {
    const [latency, setLatency] = useState(() => Array.from({ length: IP_LENGHT }, () => []));
    const [isPinging, setIsPinging] = useState(false)
    const [expandLog, setExpandLog] = useState(false);

    const [ipPartsList, setIpPartsList] = useState(
        Array.from({ length: IP_LENGHT }, (_, y) =>
            y === 0
            ? { id: y, ip: ["8", "8", "8", "8"] }
            : { id: y, ip: ["", "", "", ""] }
        )
    )

    useEffect(() => {
        async function getData() { 
            const ipData = await window.storeAPI.get('pingList')
            ipData ? setIpPartsList(ipData) : console.log("JSON file missing");
        }
        getData()
    }, []);

    function changeIP(y, x, e) {
        const value = e.target.value
        
        if (value.length <= 3) {
            const ipListCopy = [...ipPartsList];
            ipListCopy[y].ip[x] = value;
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


    async function saveAndExit() {
        await window.storeAPI.set('pingList', ipPartsList)
        window.winapi.close()
    }


    async function ping() {
        await window.storeAPI.set('pingList', ipPartsList)

        const ipAddresses = ipPartsList
        .map(item => (item.ip.some(o => o === "") ? null : {...item, ip: item.ip.join(".") }))
        .filter(Boolean); // removes null/undefined/empty

        window.startPig.sendIP(ipAddresses)
        window.startPig.clearPingListeners();

        window.startPig.onPing((pingResp) => {            
            const pingRespCopy = [...latency]
            
            pingResp.forEach(el =>{
                const pingResult = regex(el.log)
                pingRespCopy[el.id].push(pingResult)
            } )
            setLatency(pingRespCopy)
        });

        setIsPinging(true)
    }

    function regex(str) {

        return str
    }

    function stopPing() {
        setIsPinging(false)
        window.startPig.stopPing()
        window.startPig.clearPingListeners();
    }

    function reziseLog() {
        setExpandLog(prev => !prev);
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
                <button onClick={() => saveAndExit()} id="closeWin" className="win-btn close" title="Close">✕</button>
            </div>
        </header>
      
        <div className="content">
            <div id="settingsForm">
                <div className="inputWrapper">
                    {Array.from({ length: IP_LENGHT }, (_, y) => (
                        <div key={y} className="field">
                            <div className='IPinput'>
                                {Array.from({ length: 4 }, (_, x) => (
                                    <React.Fragment key={x}>
                                        {y == 0 ? <input value={8} readOnly /> :
                                            <input
                                                id={`ipPart${y}-${x}`}
                                                value={ipPartsList[y].ip[x]}
                                                onChange={(e) => changeIP(y, x, e)}
                                                onKeyDown={(e) => handleKeys(x, e)}
                                                type="number"
                                            />
                                        }

                                        {x < 3 && <span className="dot">.</span>}
                                    </React.Fragment>
                                ))}
                            </div>
                            <div onClick={() => reziseLog(y)} className='pingLog'>
                                High <span>{latency[y][latency[y].length-1]}</span>
                            </div>
                        </div>
                    ))}
                </div>
                {isPinging ? <button onClick={stopPing} className="stopBtn">Stop</button>:
                    <button onClick={ping} className="startBtn">Ping</button>}  
                {expandLog && (
                    <div onClick={reziseLog} className="pingLogExpanded" >
                        
                    </div>
                )}  
            </div>
        </div>
      <hr className="loading-line" />
    </div>
  );
}