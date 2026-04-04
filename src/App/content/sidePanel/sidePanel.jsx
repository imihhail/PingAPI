import React from "react";
import PingLocation from "./settings/location";
import IpLines from "./settings/ipLines";
import PingInterval from "./settings/pingInterval";
import DownloadSize from "./settings/downloadSize";
import LogMemory from "./settings/LogMemory";


function SidePanel({ isPinging, pingLocations, setIplists, ipList }) {

    return (
        <div className='topSection'>
            <PingLocation pingLocations = { pingLocations } isPinging = { isPinging }/> 
            <IpLines      ipList = { ipList } setIplists = { setIplists } isPinging = { isPinging }/>
            <PingInterval isPinging = { isPinging }/>
            <DownloadSize isPinging = { isPinging }/>
            <LogMemory    isPinging = { isPinging }/>
        </div>
    );
}

export default React.memo(SidePanel);