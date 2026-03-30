import { useState, useRef, useEffect, useContext } from "react";
import React from 'react';
import { LocationContext } from "../../layout";
import { startSpeedTest } from "./speedTest";
import PingLog from "./pingLog";


function IpList({ isPinging, setIsPinging, ipData }) {
    const { currentLoc } = useContext(LocationContext)
    const [ipList, setIpList] = useState(null)
    const controllerRef = useRef(null)
    const [speed_Mbps, setSpeed_Mbps] = useState("")
    const [selectedIpLog, setSelectedIpLog] = useState({id: null, isExpanded: false});

console.log("iplist");

    useEffect(() => {
        (async function getData() {     
            const ipLoc = await window.storeAPI.get(`Locations.${currentLoc.key}`)

            setIpList(ipLoc)
        })()
    }, [currentLoc]);

    function changeIP(y, x, e) {
        const value = e.target.value
        
        if (value.length <= 3) {
            const ipListCopy = [...ipList];
            ipListCopy[y].ip[x] = value;
            setIpList(ipListCopy)
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
        
        //await window.storeAPI.set(`Locations.${ipLocations.currentLoc.location}`, ipPartsList);

        // const ipAddresses = ipPartsList
        //     .map(item => (item.ip.some(o => o === "") ? null :
        //     {...item, ip: item.ip.join(".") })).filter(Boolean); // removes null/undefined/empty
        
        // window.startPig.sendIP(ipAddresses)
        // window.startPig.clearPingListeners();
        // window.startPig.onPing(pingResp => {
        //     // if (!isSpeedTestRunning && pingResp[0].connection) {
        //     //     isSpeedTestRunning    = true
        //     //     const controller      = startSpeedTest(setSpeed_Mbps)
        //     //     controllerRef.current = controller
        //     // }
        //     setIpList(prev => {
        //         const copy = prev.slice()             

        //         pingResp.forEach(el => {
        //             copy[el.id].speed      = el.speed
        //             copy[el.id].avg        = el.avg
        //             copy[el.id].ipLog      = el.ipLog
        //             copy[el.id].packetLoss = el.packetLoss
        //         })
        //         return copy
        //     })
        // })
        setIsPinging(true)
    }

    function stopPing() {       
        controllerRef.current?.abort();
        setIsPinging(false)
        window.startPig.stopPing()
        window.startPig.clearPingListeners();
    }
   
    function resizeLog(y) {      
        if (ipList[y].ipLog && ipList[y].ipLog.length > 0) {            
            setSelectedIpLog(prev => ({
                id: y,
                isExpanded: !prev.isExpanded
            }));

            window.winapi.resize(selectedIpLog.isExpanded)
        }
    }  

    return (
        <div id="settingsForm">
            <div className='ipsBorder'>

                {ipList?.map((_, y) => (
                    <div key={y} className="field">
                        <div className='IPinput'>
                            {Array.from({ length: 4 }, (_, x) => (
                                <React.Fragment key={x}>
                                    {y == 0 ? <input value={8} readOnly /> :
                                        <input
                                            id={`ipPart${y}-${x}`}
                                            value={ipList[y]?.ip?.[x] ?? ''}
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
                            <span className="pingStats" id={y}>
                                {ipList[y].speed ? (
                                    <>
                                    <span className="pingStats_ping">Ping: <strong>{ipList[y].speed}ms</strong></span>
                                    <span className="pingStats_avg">Avg: <strong>{ipList[y].avg ?? '-'}ms</strong></span>
                                    <span className="pingStats_pl">PL: <strong>{ipList[y].packetLoss ?? '-'}%</strong></span>
                                    {ipList[y] == ipList[0] && (<span className="pingStats_pl">Download speed: <strong>{speed_Mbps}Mbps</strong></span>)}
                                    </>
                                ) : (
                                    ipList[y].ipLog ? ipList[y].ipLog[ipList[y].ipLog.length - 1]?.pingLog : ""
                                )}
                            </span>
                        </div>
                    </div>
                ))}

                {isPinging ? <button onClick={stopPing} className="stopBtn">Stop</button>:
                            <button onClick={ping} className="startBtn">Ping</button>
                }  

            </div>

            {selectedIpLog.isExpanded && (
                <PingLog selectedIpLog = {selectedIpLog}/>
            )}
            
        </div>
    );
}

export default IpList;