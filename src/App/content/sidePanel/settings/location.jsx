import React, { useContext, useState } from "react";
import { LocationContext } from "../../../layout";
import { CircleGauge, CloudDownload, MapPinHouse, MapPinned } from 'lucide-react';

function PingLocation({ pingLocations, isPinging }) {
    const { currentLoc, setCurrentLoc } = useContext(LocationContext)
    const [displaySetting, setDisplaySetting] = useState(false)


    function prevLoc() {        
        if (currentLoc.i < 1 || isPinging) return

        const newLoc = pingLocations[currentLoc.i - 1]
        setCurrentLoc(newLoc)   
    }

    function nextLoc() {
        if (currentLoc.i >= pingLocations.length - 1 || isPinging) return

        const newLoc = pingLocations[currentLoc.i + 1]
        setCurrentLoc(newLoc)
    }

    const toggleSetting = () => setDisplaySetting(prev => !prev)


    return (
        <>
            <div
                className={`settingBtn ${displaySetting ? 'opened' : ''}`}
                onClick={toggleSetting}
            >
                <MapPinHouse strokeWidth={1.5}/>
                <span className="settingTxt">Server location</span>
            </div>

            <div className={`toggleSetting ${displaySetting ? 'opened' : ''}`}>
                <button className="navBtn" onClick={prevLoc}>◄</button>

                <input
                    className="settingOutput"
                    type="text"
                    value={currentLoc.key}
                    disabled
                />

                <button className="navBtn" onClick={nextLoc}>►</button>
            </div>
        </>
    )
}

export default PingLocation;