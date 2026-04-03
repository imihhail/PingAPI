import React, { useContext, useState } from "react";



function PingOutput({ ipList, onClick }) {
    const [displaySetting, setDisplaySetting] = useState(false)
  




    return (
        <div onClick={onClick} className='pingLog'>
            <span className="pingStats" >
                {ipList.speed ? (
                    <>
                    <span className="pingStats_ping">Ping: <strong>{ipList.speed}ms</strong></span>
                    <span className="pingStats_avg">Avg: <strong>{ipList.avg ?? '-'}ms</strong></span>
                    <span className="pingStats_pl">PL: <strong>{ipList.packetLoss ?? '-'}%</strong></span>
                    {ipList == ipList[0] && (<span className="pingStats_pl">Download speed: <strong>{speed_Mbps}Mbps</strong></span>)}
                    </>
                ) : (
                    ipList.ipLog ? ipList.ipLog[ipList.ipLog.length - 1]?.pingLog : ""
                )}
            </span>
        </div>
    );
}

export default PingOutput;