import React, { useContext } from "react";
import { LocationContext } from "../app";
import PingLocation from "./location";
import { PingAttributes } from "./ipCLass";
import { Server, CircleGauge, CloudDownload, MapPinHouse, MapPinned } from 'lucide-react';


function SidePanel({ sideBarOpened, ipLength, setIpLength }) {
    const { currentLoc, setCurrentLoc, ipPartsList, setIpPartsList } = useContext(LocationContext)
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
    

    return (
        <div className={`sideBar ${sideBarOpened ? 'opened' : ''}`}>
            <div className='topSection'>
                <div className="ipLines">
                    <MapPinHouse strokeWidth={strokeWith}/>
                    <span className="ipLabel">Server location</span>
                </div>
                <div className="ipOption">
                    <PingLocation />       
                </div>
                <div className="ipLines">
                    <Server strokeWidth={strokeWith}/>
                    <span className="ipLabel">IP count</span>
                    {/* <div className="ipControl" >
                        <button className="ipBtn" onClick={removeIP}>◄</button>
                        <input  className="ipNumber" type="number" value={ipLength} readOnly/>
                        <button className="ipBtn" onClick={addIP}>►</button>
                    </div> */}
                </div>

                <div className="ipLines">
                    <CircleGauge strokeWidth={strokeWith}/>
                    <span className="ipLabel">Ping frequency</span>
                    {/* <button className="ipBtn" onClick={removeIP}>◄</button>
                    <input className="ipNumber"  value={`${2000}ms`} readOnly/>
                    <button className="ipBtn" onClick={addIP}>►</button> */}
                </div>
                <div className="ipLines">
                    <CloudDownload strokeWidth={strokeWith}/>
                    <span className="ipLabel">Download size</span>
                    {/* <button className="ipBtn" onClick={removeIP}>◄</button>
                    <input className="ipNumber"  value={`${50}MB`} readOnly/>
                    <button className="ipBtn" onClick={addIP}>►</button> */}
                </div>
                <div className="ipLines">
                    <MapPinned strokeWidth={strokeWith}/>
                    <span className="ipLabel">Location</span>
                    {/* <input className="ipNumber" value={`${50}MB`} readOnly/> */}
                </div>
            </div>
        </div>
    );
}

export default SidePanel;