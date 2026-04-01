import React, { useState, useRef, useContext, useEffect } from "react";
import { LocationContext } from "../../layout";
import { startSpeedTest } from "./speedTest";
import PingLog from "./pingLog";


function IpList({ isPinging, setIsPinging, ipLists, setIplists }) {
    const { currentLoc } = useContext(LocationContext)
    const locInd = currentLoc.i
    const ipList = ipLists[locInd]
    const deBounceTimer = useRef(null)
    const controllerRef = useRef(null)
    const [speed_Mbps, setSpeed_Mbps] = useState("")
    const [selectedIpLog, setSelectedIpLog] = useState({id: null, isExpanded: false});
    

    function changeIP(y, x, e) {
        const value = e.target.value
        
        if (value.length > 3) return

        const ipListCopy = [...ipLists]
        ipListCopy[locInd][y].ip[x] = value
        setIplists(ipListCopy)
        
        if (value.length == 3 && x != 3) {
            e.target.nextSibling.nextSibling.focus()
        }
        saveData()
    }

    function saveData() {
        if (deBounceTimer.current) {
            clearTimeout(deBounceTimer.current)
            deBounceTimer.current = null
        }

        deBounceTimer.current = setTimeout(() => {
            window.storeAPI.set(`Locations.${currentLoc.key}`, ipList.map(({id, ip}) => ({ id, ip })));
        }, 2000);  
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
        
        window.storeAPI.set(`Locations.${currentLoc.key}`, ipList.map(({id, ip}) => ({ id, ip })));

        const ipAddresses = ipList
            .map(item => (item.ip.some(o => o === "") ? null :
            {...item, ip: item.ip.join(".") })).filter(Boolean); // removes null/undefined/empty
        
        window.startPig.sendIP(ipAddresses)
        window.startPig.clearPingListeners();
        window.startPig.onPing(pingResp => {
            
            // if (!isSpeedTestRunning && pingResp[0].connection) {
            //     isSpeedTestRunning    = true
            //     const controller      = startSpeedTest(setSpeed_Mbps)
            //     controllerRef.current = controller
            // }
            setIplists(prev => {
                const copy = prev.slice()             

                pingResp.forEach(el => {
                    copy[locInd][el.id].speed      = el.speed
                    copy[locInd][el.id].avg        = el.avg
                    copy[locInd][el.id].ipLog      = el.ipLog
                    copy[locInd][el.id].packetLoss = el.packetLoss
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
                <PingLog selectedIpLog = {selectedIpLog} ipList = { ipList }/>
            )}
            
        </div>
    );
}

export default React.memo(IpList);