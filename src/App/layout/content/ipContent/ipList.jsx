import React, { useState, useRef, useContext, useEffect } from "react";
import { LocationContext } from "../../../layout/layout";
import { startSpeedTest } from "./speedTest";
import PingLog from "./pingLog";
import PingOutput from "./pingOutput";


function IpList({ isPinging, setIsPinging, ipLists, setIplists }) {
    const { currentLoc, settingsData } = useContext(LocationContext)
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
        
        window.startPig.sendIP(ipAddresses, settingsData)
        window.startPig.clearPingListeners();
        
        window.startPig.onPing(pingResp => {
            if (!isSpeedTestRunning && pingResp[0].connection) {
                isSpeedTestRunning    = true
                const controller      = startSpeedTest(setSpeed_Mbps, settingsData.DownloadSize)
                controllerRef.current = controller
            }

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
        if (!ipList[y].ipLog || ipList[y].ipLog.length === 0) return

        setSelectedIpLog(prev => ({
            id: y,
            isExpanded: prev.id === y ? !prev.isExpanded : true 
        }))
    }

    useEffect(()=> {
        window.winapi.resize(selectedIpLog.isExpanded)
    }, [selectedIpLog])


    return (
        <div id="content">
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
                        <PingOutput
                            ipList        = { ipList[y] }
                            selectedIpLog = { selectedIpLog }
                            speed_Mbps    = { speed_Mbps }
                            onClick={() => resizeLog(y)}
                        />
                    </div>
                ))}

                {isPinging ?
                    <button onClick={stopPing} className="stopBtn">Stop</button>:
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