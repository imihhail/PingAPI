import React, {useState} from "react";
import PingLocation from "./settings/location";
import IpLines from "./settings/ipLines";
import PingInterval from "./settings/pingInterval";
import DownloadSize from "./settings/downloadSize";
import LogMemory from "./settings/LogMemory";


function SidePanel({ isPinging, pingLocations, setIplists, ipList }) {
    const [openSetting, setOpenSetting] = useState(null);
    

    const toggle = (name) => setOpenSetting(prev => prev === name ? null : name);


    return (
        <div className='topSection'>
            <PingLocation
                pingLocations = {pingLocations}
                isPinging     = {isPinging}
                isOpen        = {openSetting == 'location'}
                onToggle      = {() => toggle('location')} 
            />
            <IpLines      
                ipList     = {ipList}
                setIplists = {setIplists}
                isPinging  = {isPinging}
                isOpen     = {openSetting == 'ipLines'}
                onToggle   = {() => toggle('ipLines')} 
            />
            <PingInterval 
                isPinging = {isPinging}
                isOpen    = {openSetting == 'pingInterval'}
                onToggle  = {() => toggle('pingInterval')}
            />
            <DownloadSize
                isPinging = {isPinging}
                isOpen    = {openSetting == 'downloadSize'} 
                onToggle  = {() => toggle('downloadSize')}
            />
            <LogMemory    
                isPinging = {isPinging}
                isOpen    = {openSetting == 'logMemory'}
                onToggle  = {() => toggle('logMemory')} 
            />
        </div>
    );
}

export default React.memo(SidePanel);