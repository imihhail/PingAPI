import { useState, useContext } from "react";
import React from 'react';
import { LocationContext } from "../app";

function TitleBar({ toggleSidePanel }) {
    const { currentLoc, setCurrentLoc } = useContext(LocationContext)


    async function saveAndExit() {
        await window.storeAPI.set('pingList', ipPartsList.map(({id, ip}) => ({ id, ip })));
        window.winapi.close()
    }


    return (
        <header className="titlebar">
            <button id="menuBtn" onClick={toggleSidePanel} className="hamburger-btn" aria-expanded="false" aria-label="Open menu">
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
            </button>

            <span className='pingLocation'>{currentLoc.location}</span>

            <div className="titlebar-right">
                <button onClick={() => window.winapi.minimize()} id="minBtn" className="win-btn" title="Minimize">—</button>
                <button id="maxBtn" className="win-btn" title="Maximize" disabled>▢</button>
                <button onClick={() => saveAndExit()} id="closeWin" className="win-btn close" title="Close">✕</button>
            </div>
        </header>
    );
}

export default TitleBar;