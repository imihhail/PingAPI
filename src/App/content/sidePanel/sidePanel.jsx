import React, { useContext, useState } from "react";
import { LocationContext } from "../../layout";
import PingLocation from "./sidePanelContent/location";
import { PingAttributes } from "../../ipCLass";
import { Server, CircleGauge, CloudDownload, MapPinHouse, MapPinned } from 'lucide-react';


function SidePanel({ ipLength, setIpLength, isPinging, pingLocations }) {
    console.log("sidepanel is loading");
    
    const { ipPartsList } = useContext(LocationContext)
    const strokeWith = 1.5    
    const [displayOptions, setDisplayOptions] = useState(null)


    function addIP() {
        if (ipPartsList.length < 7 && !isPinging) {
            //setIpLength(prev => prev + 1)
            ipPartsList.push(new PingAttributes(ipPartsList.length, ["", "", "", ""]))
        }
    }

    function removeIP() {
        if (ipPartsList.length > 1 && !isPinging) {
            setIpLength(prev => prev - 1)
            ipPartsList.pop()
        }
    }

    function toggleOptions(id) {
        setDisplayOptions(prev => prev == id ? null: id)
    }
    

    return (
        <div className='topSection'>
            <div data-testid="sideBarline-1" className={`ipLines ${displayOptions === 1 ? 'opened' : ''}`}
                onClick={() => toggleOptions(1)}>
                <MapPinHouse strokeWidth={strokeWith}/>
                <span className="ipLabel">Server location</span>
            </div>
            <div className={`ipOption ${displayOptions == 1 ? 'opened' : ''}`}>
                <PingLocation pingLocations = { pingLocations } />       
            </div>

            <div className={`ipLines ${displayOptions === 2 ? 'opened' : ''}`}
                    onClick={() => toggleOptions(2)}>
                <Server strokeWidth={strokeWith}/>
                <span className="ipLabel">IP count</span>
            </div>
            <div className={`ipOption ${displayOptions == 2 ? 'opened' : ''}`} >
                <button className="ipBtn" onClick={removeIP}>◄</button>
                <input  className="ipNumber" type="number" value={ipLength} disabled/>
                <button className="ipBtn" onClick={addIP}>►</button>
            </div>

            <div className={`ipLines ${displayOptions === 3 ? 'opened' : ''}`}
                    onClick={() => toggleOptions(3)}>
                <CircleGauge strokeWidth={strokeWith}/>
                <span className="ipLabel">Ping frequency</span>
            </div>
            <div className={`ipOption ${displayOptions == 3 ? 'opened' : ''}`} >
                <button className="ipBtn" onClick={removeIP}>◄</button>
                <input  className="ipNumber" type="number" value={ipLength} disabled/>
                <button className="ipBtn" onClick={addIP}>►</button>
            </div>

            <div className={`ipLines ${displayOptions === 4 ? 'opened' : ''}`}
                    onClick={() => toggleOptions(4)}>
                <CloudDownload strokeWidth={strokeWith}/>
                <span className="ipLabel">Download size</span>
            </div>
            <div className={`ipOption ${displayOptions == 4 ? 'opened' : ''}`} >
                <button className="ipBtn" onClick={removeIP}>◄</button>
                <input  className="ipNumber" type="number" value={ipLength} disabled/>
                <button className="ipBtn" onClick={addIP}>►</button>
            </div>

            <div className={`ipLines ${displayOptions === 5 ? 'opened' : ''}`}
                    onClick={() => toggleOptions(5)}>
                <MapPinned strokeWidth={strokeWith}/>
                <span className="ipLabel">Log memory</span>
            </div>
            <div className={`ipOption ${displayOptions == 5 ? 'opened' : ''}`} >
                <button className="ipBtn" onClick={removeIP}>◄</button>
                <input  className="ipNumber" type="number" value={ipLength} disabled/>
                <button className="ipBtn" onClick={addIP}>►</button>
            </div>                

            <div className={`ipLines ${displayOptions === 6 ? 'opened' : ''}`}
                    onClick={() => toggleOptions(6)}>
                <MapPinned strokeWidth={strokeWith}/>
                <span className="ipLabel">Location</span>
            </div>
            <div className={`ipOption ${displayOptions == 6 ? 'opened' : ''}`} >
                <button className="ipBtn" onClick={removeIP}>◄</button>
                <input  className="ipNumber" type="number" value={ipLength} disabled/>
                <button className="ipBtn" onClick={addIP}>►</button>
            </div>
        </div>
    );
}

export default React.memo(SidePanel);