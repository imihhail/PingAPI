import React, { useContext } from "react";
import { LocationContext } from "../app";

function TitleBar({ toggleSidePanel }) {
    const { ipData } = useContext(LocationContext) ?? {};
    const currentLoc = ipData

    console.log("titlebar: ", currentLoc);
    
    async function saveAndExit() {
        if (!currentLoc) window.winapi.close()

        await window.storeAPI.set(`Locations.${ipLocations.currentLoc.location}`,
                                  ipPartsList.map(({id, ip}) => ({ id, ip })));
        window.winapi.close()
    }


    return (
        <header className="titlebar">
            <button id="menuBtn" onClick={toggleSidePanel} className="hamburger-btn" >
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
            </button>

            <span className='pingLocation'>{currentLoc?.location ?? ''}</span>

            <div className="titlebar-right">
                <button onClick={() => window.winapi.minimize()} id="minBtn" className="win-btn">—</button>
                <button id="maxBtn" className="win-btn" disabled>▢</button>
                <button onClick={() => saveAndExit()} id="closeWin" className="win-btn close">✕</button>
            </div>
        </header>
    );
}

export default TitleBar;