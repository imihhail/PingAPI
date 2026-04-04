import React from "react";


function PingOutput({ ipList, onClick, speed_Mbps }) {
    const hasSpeed    = Boolean(ipList.speed)
    const lastPingLog = ipList.ipLog?.[ipList.ipLog.length - 1]?.pingLog ?? ""
    const isFirstItem = ipList.id === 0
    //console.log(ipList);
    

    return (
        <div onClick={onClick} className="pingLog">
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
            </span>
        </div>
    );
}

export default PingOutput;