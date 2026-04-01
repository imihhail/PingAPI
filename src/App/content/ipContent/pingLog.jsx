import React, { useRef, useLayoutEffect } from "react";


function PingLog({ selectedIpLog, ipList }) {
    const logBoxRef = useRef(null)

    
    useLayoutEffect(() => {  
        const logBox = logBoxRef.current
        if (!logBox) return
        
        const scrollVal = logBox.clientHeight + logBox.scrollTop + 33

        if (scrollVal == logBox.scrollHeight) {
            logBox.scrollTop = logBox.scrollHeight    
        }
    }, );

    useLayoutEffect(() => {             
        const logBox = logBoxRef.current
        if (!logBox) return

        logBox.scrollTop = logBox.scrollHeight    
    }, [selectedIpLog]);


    return (
        <div className="pingLogExpanded" ref={logBoxRef}>
            <div className="pingLogSpacer" />

            {ipList[selectedIpLog.id]?.ipLog?.map((log, i) => (
                <div className="pingOutput" key={i}>
                    <p>{log.pingLog}</p>
                    <p className="ipConfig">IPv4: {log.ipConfig}</p>
                </div>
            ))}
        </div>
    );
}

export default PingLog;