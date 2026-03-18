import React, { useContext, useState } from "react";
import { LocationContext } from "../app";
import PingLocation from "./location";
import { PingAttributes } from "./ipCLass";
import { Server, CircleGauge, CloudDownload, MapPinHouse, MapPinned } from 'lucide-react';


function SidePanel({ sideBarOpened, ipLength, setIpLength }) {
    const { currentLoc, setCurrentLoc, ipPartsList, setIpPartsList } = useContext(LocationContext)
    const [displayOptions, setDisplayOptions] = useState(false)
    const strokeWith = 1.5

    
    function addIP() {
        if (ipPartsList.length < 7) {
            setIpLength(prev => prev + 1)
            ipPartsList.push(new PingAttributes(ipPartsList.length, ["", "", "", ""]))
        }
    }

    function removeIP() {
        if (ipPartsList.length > 1) {
            setIpLength(prev => prev - 1)
            ipPartsList.pop()
        }
    }

    function toggleOptions() {
        setDisplayOptions(prev => !prev)
    }
    

    return (
        <div className={`sideBar ${sideBarOpened ? 'opened' : ''}`}>
            <div className='topSection'>

                <div id="1" className="ipLines" onClick={toggleOptions}>
                    <MapPinHouse strokeWidth={strokeWith}/>
                    <span className="ipLabel">Server location</span>
                </div>
                <div className={`ipOption ${displayOptions ? 'opened' : ''}`}>
                    <PingLocation />       
                </div>

                <div id="2" className="ipLines">
                    <Server strokeWidth={strokeWith}/>
                    <span className="ipLabel">IP count</span>
                </div>
                <div className={`ipOption ${displayOptions ? 'opened' : ''}`} >
                    <button className="ipBtn" onClick={removeIP}>◄</button>
                    <input  className="ipNumber" type="number" value={ipLength} readOnly/>
                    <button className="ipBtn" onClick={addIP}>►</button>
                </div>

                <div id="3" className="ipLines">
                    <CircleGauge strokeWidth={strokeWith}/>
                    <span className="ipLabel">Ping frequency</span>
                    {/* <button className="ipBtn" onClick={removeIP}>◄</button>
                    <input className="ipNumber"  value={`${2000}ms`} readOnly/>
                    <button className="ipBtn" onClick={addIP}>►</button> */}
                </div>
                <div id="4" className="ipLines">
                    <CloudDownload strokeWidth={strokeWith}/>
                    <span className="ipLabel">Download size</span>
                    {/* <button className="ipBtn" onClick={removeIP}>◄</button>
                    <input className="ipNumber"  value={`${50}MB`} readOnly/>
                    <button className="ipBtn" onClick={addIP}>►</button> */}
                </div>
                <div id="5" className="ipLines">
                    <MapPinned strokeWidth={strokeWith}/>
                    <span className="ipLabel">Location</span>
                    {/* <input className="ipNumber" value={`${50}MB`} readOnly/> */}
                </div>
            </div>
        </div>
    );
}

export default SidePanel;