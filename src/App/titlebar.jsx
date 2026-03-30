import React, { useContext } from "react";
import { LocationContext } from "./app";

function TitleBar({ setSideBarOpened }) {
    console.log("titlebar is rendering");
    
    const { contextValue } = useContext(LocationContext) ?? {};
    const currentLoc = contextValue?.ipData?.pingLocations[0].key
    

    async function saveAndExit() {
        if (!currentLoc) window.winapi.close()

        await window.storeAPI.set(`Locations.${currentLoc}`,
                                  ipPartsList.map(({id, ip}) => ({ id, ip })));
        window.winapi.close()
    }

    function toggleSidePanel() {
        setSideBarOpened(prev => !prev)
    }


    return (
        <header className="titlebar">
            <button id="menuBtn" onClick={toggleSidePanel} className="hamburger-btn" >
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
            </button>

            <span className='pingLocation'>{currentLoc ?? ''}</span>

            <div className="titlebar-right">
                <button onClick={() => window.winapi.minimize()} id="minBtn" className="win-btn">—</button>
                <button id="maxBtn" className="win-btn" disabled>▢</button>
                <button onClick={() => saveAndExit()} id="closeWin" className="win-btn close">✕</button>
            </div>
        </header>
    );
}

export default TitleBar;