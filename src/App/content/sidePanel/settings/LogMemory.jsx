import React, { useContext, useState } from "react";
import { LocationContext } from "../../../layout";

import { MemoryStick } from 'lucide-react';


function LogMemory({ isPinging }) {
    const { settingsData, setSettingsData } = useContext(LocationContext)
    const [displaySetting, setDisplaySetting] = useState(false)

  
    function decrease() {
        if (settingsData.LogMemory < 20 || isPinging) return 

        setSettingsData(prev => ({
            ...prev,
            LogMemory: prev.LogMemory - 10
        }))  
    }

    function increase() {
        if (isPinging) return 
        
        setSettingsData(prev => ({
            ...prev,
            LogMemory: prev.LogMemory + 10
        }))                        
    }

    const toggleSetting = () => setDisplaySetting(prev => !prev)


    return (
        <>
            <div
                className={`settingBtn ${displaySetting ? 'opened' : ''}`}
                onClick={toggleSetting}
            >
                <MemoryStick strokeWidth={1.5}/>
                <span className="settingTxt">Log memory</span>
            </div>

            <div className={`toggleSetting ${displaySetting ? 'opened' : ''}`}>
                <button className="navBtn" onClick={decrease}>◄</button>

                <input
                    className="settingOutput"
                    type="number"
                    value={settingsData.LogMemory}
                    disabled
                />

                <button className="navBtn" onClick={increase}>►</button>
            </div>
        </>
    );
}

export default LogMemory;