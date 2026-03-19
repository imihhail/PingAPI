import React, { useContext, useState } from "react";
import { LocationContext } from "../app";
import PingLocation from "./location";
import { PingAttributes } from "./ipCLass";
import { Server, CircleGauge, CloudDownload, MapPinHouse, MapPinned } from 'lucide-react';


function SidePanel({ sideBarOpened, ipLength, setIpLength }) {
    const { currentLoc, setCurrentLoc, ipPartsList, setIpPartsList } = useContext(LocationContext)
    const [displayOptions, setDisplayOptions] = useState(null)
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

    function toggleOptions(id) {
        setDisplayOptions(prev => prev == id ? null: id)
    }
    

    return (
        <div className={`sideBar ${sideBarOpened ? 'opened' : ''}`}>
            <div className='topSection'>

                <div className={`ipLines ${displayOptions === 1 ? 'opened' : ''}`}
                    onClick={() => toggleOptions(1)}>
                    <MapPinHouse strokeWidth={strokeWith}/>
                    <span className="ipLabel">Server location</span>
                </div>
                <div className={`ipOption ${displayOptions == 1 ? 'opened' : ''}`}>
                    <PingLocation />       
                </div>

                <div className="ipLines" onClick={() => toggleOptions(2)}>
                    <Server strokeWidth={strokeWith}/>
                    <span className="ipLabel">IP count</span>
                </div>
                <div className={`ipOption ${displayOptions == 2 ? 'opened' : ''}`} >
                    <button className="ipBtn" onClick={removeIP}>◄</button>
                    <input  className="ipNumber" type="number" value={ipLength} readOnly/>
                    <button className="ipBtn" onClick={addIP}>►</button>
                </div>

                <div className="ipLines" onClick={() => toggleOptions(3)}>
                    <CircleGauge strokeWidth={strokeWith}/>
                    <span className="ipLabel">Ping frequency</span>
                </div>
                <div className={`ipOption ${displayOptions == 3 ? 'opened' : ''}`} >
                    <button className="ipBtn" onClick={removeIP}>◄</button>
                    <input  className="ipNumber" type="number" value={ipLength} readOnly/>
                    <button className="ipBtn" onClick={addIP}>►</button>
                </div>

                <div className="ipLines" onClick={() => toggleOptions(4)}>
                    <CloudDownload strokeWidth={strokeWith}/>
                    <span className="ipLabel">Download size</span>
                </div>
                <div className={`ipOption ${displayOptions == 4 ? 'opened' : ''}`} >
                    <button className="ipBtn" onClick={removeIP}>◄</button>
                    <input  className="ipNumber" type="number" value={ipLength} readOnly/>
                    <button className="ipBtn" onClick={addIP}>►</button>
                </div>

                <div className="ipLines" onClick={() => toggleOptions(5)}>
                    <MapPinned strokeWidth={strokeWith}/>
                    <span className="ipLabel">Location</span>
                </div>
                <div className={`ipOption ${displayOptions == 5 ? 'opened' : ''}`} >
                    <button className="ipBtn" onClick={removeIP}>◄</button>
                    <input  className="ipNumber" type="number" value={ipLength} readOnly/>
                    <button className="ipBtn" onClick={addIP}>►</button>
                </div>
            </div>
        </div>
    );
}

export default SidePanel;