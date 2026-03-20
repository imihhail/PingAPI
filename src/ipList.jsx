import { useState, useRef, useEffect, useContext } from "react";
import React from 'react';
import { LocationContext } from "./app";
import { startSpeedTest } from "./speedTest";


function IpList({ ipLength, setIpLength }) {
    const { currentLoc, setCurrentLoc, ipPartsList, setIpPartsList } = useContext(LocationContext)
    const controllerRef = useRef(null)
    const [isPinging, setIsPinging]   = useState(false)
    const [speed_Mbps, setSpeed_Mbps] = useState("")
    const [selectedIpLog, setSelectedIpLog] = useState({id: null, isExpanded: false});
    const logRef = useRef(null);

    useEffect(() => {

    }, [ipPartsList]);


    useEffect(() => {
        (async function getData() {
            const ipData = await window.storeAPI.get(`Locations.${currentLoc.location}`)

            setIpLength(ipData.length)
            setIpPartsList(ipData)
        })()
    }, [currentLoc]);

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

    async function ping() {
        let isSpeedTestRunning = false
        
        await window.storeAPI.set(`Locations.${currentLoc.location}`, ipPartsList.map(({id, ip}) => ({ id, ip })));

        const ipAddresses = ipPartsList
        .map(item => (item.ip.some(o => o === "") ? null : {...item, ip: item.ip.join(".") }))
        .filter(Boolean); // removes null/undefined/empty
        
        window.startPig.sendIP(ipAddresses)
        window.startPig.clearPingListeners();
        window.startPig.onPing(pingResp => {
            // if (!isSpeedTestRunning && pingResp[0].connection) {
            //     isSpeedTestRunning    = true
            //     const controller      = startSpeedTest(setSpeed_Mbps)
            //     controllerRef.current = controller
            // }
            
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
        if (ipPartsList[y].pingLog) {
            setSelectedIpLog(prev => ({
                id: y,
                isExpanded: !prev.isExpanded
            }));
        }
    }    


    return (
        <div id="settingsForm">
            <div className='ipsBorder'>
            {ipPartsList && Array.from({ length: ipLength }, (_, y) => (
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
            </div> 
            {selectedIpLog.isExpanded && (
                <div onClick={resizeLog} className="pingLogExpanded">
                    <div className="pingLogSpacer" />
                    {ipPartsList[selectedIpLog.id].pingLog?.map((log, i) =>
                        <p key={i}>{log}</p>
                    )}
                    <div ref={logRef} />
                </div>
            )}
        </div>
    );
}

export default IpList;