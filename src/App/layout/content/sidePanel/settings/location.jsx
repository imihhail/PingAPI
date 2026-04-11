import React, { useContext } from "react";
import { LocationContext } from "../../../../layout/layout";
import { MapPinHouse } from 'lucide-react';

function PingLocation({ pingLocations, isPinging, isOpen, onToggle }) {
    const { currentLoc, setCurrentLoc } = useContext(LocationContext)


    function prevLoc() {        
        if (currentLoc.i < 1 || isPinging) return
        setCurrentLoc(pingLocations[currentLoc.i - 1])   
    }

    function nextLoc() {
        if (currentLoc.i >= pingLocations.length - 1 || isPinging) return
        setCurrentLoc(pingLocations[currentLoc.i + 1])
    }
    

    return (
        <>
            <div
                className={`settingBtn ${isOpen ? 'opened' : ''}`}
                onClick={onToggle}
            >
                <MapPinHouse strokeWidth={1.5}/>
                <span className="settingTxt">Server location</span>
            </div>

            <div className={`toggleSetting ${isOpen ? 'opened' : ''}`}>
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