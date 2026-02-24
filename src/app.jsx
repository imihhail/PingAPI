import React from 'react';
import { useRef, useState, useEffect } from "react";
import { PingAttributes } from "./ipCLass";
import { startSpeedTest } from "./speedTest";


const IP_LENGHT = 5

export default function App() {
    const controllerRef = useRef(null)
    const [isPinging, setIsPinging]   = useState(false)
    const [speed_Mbps, setSpeed_Mbps] = useState("")
    const [selectedIpLog, setSelectedIpLog] = useState({id: null, isExpanded: false});
    const [ipPartsList, setIpPartsList] = useState(
        Array.from({ length: IP_LENGHT }, (_, y) =>
            y === 0
            ? new PingAttributes(y, ["8", "8", "8", "8"])
            : new PingAttributes(y, ["", "", "", ""]) 
        )
    )

    useEffect(() => {
        async function getData() { 
            const ipData = await window.storeAPI.get('pingList')
            ipData ? setIpPartsList(ipData) : console.error("JSON file missing!");
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
        await window.storeAPI.set('pingList', ipPartsList.map(({id, ip}) => ({ id, ip })));
        window.winapi.close()
    }

    async function ping() {
        let isSpeedTestRunning = false

        await window.storeAPI.set('pingList', ipPartsList)

        const ipAddresses = ipPartsList
        .map(item => (item.ip.some(o => o === "") ? null : {...item, ip: item.ip.join(".") }))
        .filter(Boolean); // removes null/undefined/empty

        window.startPig.sendIP(ipAddresses)
        window.startPig.clearPingListeners();

        window.startPig.onPing(pingResp => {
            console.log(pingResp);
            
            if (!isSpeedTestRunning && pingResp[0].connection) {
                isSpeedTestRunning    = true
                //const controller      = startSpeedTest(setSpeed_Mbps)
                //controllerRef.current = controller
            }
            
            setIpPartsList(prev => {
                const copy = prev.slice()             

                pingResp.forEach(el => {
                    copy[el.id].speed      = el.speed
                    copy[el.id].avg        = el.avg
                    copy[el.id].pingLog    = el.pingLog
                    copy[el.id].packetLoss = el.packetLoss
                })
                
                return copy
            })
        })

        setIsPinging(true)
    }

    function stopPing() {
        controllerRef.current?.abort();
        setIsPinging(false)
        window.startPig.stopPing()
        window.startPig.clearPingListeners();
    }

    function resizeLog(y) {
        setSelectedIpLog(prev => ({
            id: y,
            isExpanded: !prev.isExpanded
        }));
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
                {Array.from({ length: IP_LENGHT }, (_, y) => (
                    <div key={y} className="field">
                        <div className='IPinput'>
                            {Array.from({ length: 4 }, (_, x) => (
                                <React.Fragment key={x}>
                                    {y == 0 ? <input value={8} readOnly /> :
                                        <input
                                            id={`ipPart${y}-${x}`}
                                            value={ipPartsList[y]?.ip?.[x] ?? ''}
                                            onChange={(e) => changeIP(y, x, e)}
                                            onKeyDown={(e) => handleKeys(x, e)}
                                            type="number"
                                        />
                                    }

                                    {x < 3 && <span className="dot">.</span>}
                                </React.Fragment>
                            ))}
                        </div>
                        <div onClick={() => resizeLog(y)} className='pingLog'>
                            <span className="pingStats">
                                {ipPartsList[y].speed ? (
                                    <>
                                    <span className="pingStats_ping">Ping: <strong>{ipPartsList[y].speed}ms</strong></span>
                                    <span className="pingStats_avg">Avg: <strong>{ipPartsList[y].avg ?? '-'}ms</strong></span>
                                    <span className="pingStats_pl">PL: <strong>{ipPartsList[y].packetLoss ?? '-'}%</strong></span>
                                    {ipPartsList[y] == ipPartsList[0] && (<span className="pingStats_pl">Download speed: <strong>{speed_Mbps}Mbps</strong></span>)}
                                    </>
                                ) : (
                                    ipPartsList[y].pingLog ? ipPartsList[y].pingLog[ipPartsList[y].pingLog.length - 1] : ""
                                )}
                            </span>
                        </div>
                    </div>
                ))}
                {isPinging ? <button onClick={stopPing} className="stopBtn">Stop</button>
                             : <button onClick={ping} className="startBtn">Ping</button>
                }  
                {selectedIpLog.isExpanded && (
                    <div onClick={resizeLog} className="pingLogExpanded">
                        {ipPartsList[selectedIpLog.id].pingLog.map((log, i) =>
                        <p key={i}>{log}</p>
                        )}
                    </div>
                )}  
            </div>
        </div>
    </div>
  );
}