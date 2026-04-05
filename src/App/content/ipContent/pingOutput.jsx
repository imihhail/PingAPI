import React, { useState, useEffect } from "react";
import { ChevronDown } from 'lucide-react';


function PingOutput({ ipList, onClick, speed_Mbps, selectedIpLog }) {
    const [isFocused, setIsFocused] = useState(false)

    const hasSpeed    = Boolean(ipList.speed)
    const lastPingLog = ipList.ipLog?.[ipList.ipLog.length - 1]?.pingLog ?? ""
    const isFirstItem = ipList.id === 0


    useEffect(() => {
        console.log(selectedIpLog);
        if (selectedIpLog.id == ipList.id) {
            if (selectedIpLog.isExpanded) {
                setIsFocused(true)
            } else {
                setIsFocused(false)
            }
        }
        
        // if (!selectedIpLog.isExpanded) return
        //console.log(selectedIpLog); // two renders on closing with another bar
        
        // setIsFocused(prev => !prev)

    },[selectedIpLog])
    

    return (
        <div onClick={onClick} className={`pingLog ${isFocused ? "focused": ""}` } >
            <span className="pingStats">
                {hasSpeed ? (
                    <>
                        <span className="pingStats_ping">
                            Ping: <strong>{ipList.speed}ms</strong>
                        </span>
                        <span className="pingStats_avg">
                            Avg: <strong>{ipList.avg ?? "-"}ms</strong>
                        </span>
                        <span className="pingStats_pl">
                            PL: <strong>{ipList.packetLoss ?? "-"}%</strong>
                        </span>

                        {isFirstItem && (
                            <span className="pingStats_pl">
                                Download speed: <strong>{speed_Mbps}Mbps</strong>
                            </span>
                        )}
                    </>
                ) : (
                    lastPingLog
                )}

                {lastPingLog && 
                    <div className="arrowDown">
                        <ChevronDown size={22} strokeWidth={1.4}/>
                    </div>
                }
            </span>
        </div>
    );
}

export default PingOutput;