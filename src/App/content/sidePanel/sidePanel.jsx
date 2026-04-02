import React from "react";
import PingLocation from "./settings/location";
import IpLines from "./settings/ipLines";



function SidePanel({ isPinging, pingLocations, setIplists, ipList }) {

    
    return (
        <div className='topSection'>
            <PingLocation pingLocations = { pingLocations } /> 

            <IpLines ipList = { ipList } setIplists = { setIplists } isPinging = { isPinging }/>
            

            {/* <div className={`ipLines ${displayOptions === 3 ? 'opened' : ''}`}
                    onClick={() => toggleOptions(3)}>
                <CircleGauge strokeWidth={strokeWith}/>
                <span className="ipLabel">Ping frequency</span>
            </div>
            <div className={`ipOption ${displayOptions == 3 ? 'opened' : ''}`} >
                <button className="ipBtn" onClick={removeIP}>◄</button>
                <input  className="ipNumber" type="number" value={ipListLen} disabled/>
                <button className="ipBtn" onClick={addIP}>►</button>
            </div>

            <div className={`ipLines ${displayOptions === 4 ? 'opened' : ''}`}
                    onClick={() => toggleOptions(4)}>
                <CloudDownload strokeWidth={strokeWith}/>
                <span className="ipLabel">Download size</span>
            </div>
            <div className={`ipOption ${displayOptions == 4 ? 'opened' : ''}`} >
                <button className="ipBtn" onClick={removeIP}>◄</button>
                <input  className="ipNumber" type="number" value={ipListLen} disabled/>
                <button className="ipBtn" onClick={addIP}>►</button>
            </div>

            <div className={`ipLines ${displayOptions === 5 ? 'opened' : ''}`}
                    onClick={() => toggleOptions(5)}>
                <MapPinned strokeWidth={strokeWith}/>
                <span className="ipLabel">Log memory</span>
            </div>
            <div className={`ipOption ${displayOptions == 5 ? 'opened' : ''}`} >
                <button className="ipBtn" onClick={removeIP}>◄</button>
                <input  className="ipNumber" type="number" value={ipListLen} disabled/>
                <button className="ipBtn" onClick={addIP}>►</button>
            </div>                

            <div className={`ipLines ${displayOptions === 6 ? 'opened' : ''}`}
                    onClick={() => toggleOptions(6)}>
                <MapPinned strokeWidth={strokeWith}/>
                <span className="ipLabel">Location</span>
            </div>
            <div className={`ipOption ${displayOptions == 6 ? 'opened' : ''}`} >
                <button className="ipBtn" onClick={removeIP}>◄</button>
                <input  className="ipNumber" type="number" value={ipListLen} disabled/>
                <button className="ipBtn" onClick={addIP}>►</button>
            </div> */}
        </div>
    );
}

export default React.memo(SidePanel);