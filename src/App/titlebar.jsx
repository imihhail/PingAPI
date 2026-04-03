import React from "react";


function TitleBar({ setSideBarOpened, currentLoc, settingsData }) {
    async function exitApp() {
        try {
await window.storeAPI.set("Settings", { ...settingsData, LocationId: currentLoc.i });
        } catch (error) {
            console.error("Failed to save:", error)
        }
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

            <span className='pingLocation'>{currentLoc?.key}</span>

            <div className="titlebar-right">
                <button onClick={() => window.winapi.minimize()} id="minBtn" className="win-btn">—</button>
                <button id="maxBtn" className="win-btn" disabled>▢</button>
                <button onClick={() => exitApp()} id="closeWin" className="win-btn close">✕</button>
            </div>
        </header>
    );
}

export default React.memo(TitleBar);