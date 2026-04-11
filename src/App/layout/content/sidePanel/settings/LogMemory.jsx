import React, { useContext } from "react";
import { LocationContext } from "../../../../layout/layout";
import { MemoryStick } from 'lucide-react';

function LogMemory({ isPinging, isOpen, onToggle }) {
    const { settingsData, setSettingsData } = useContext(LocationContext)
    

    function decrease() {
        if (settingsData.LogMemory < 20 || isPinging) return 
        setSettingsData(prev => ({ ...prev, LogMemory: prev.LogMemory - 10 }))  
    }

    function increase() {
        if (isPinging) return 
        setSettingsData(prev => ({ ...prev, LogMemory: prev.LogMemory + 10 }))                        
    }


    return (
        <>
            <div
                className={`settingBtn ${isOpen ? 'opened' : ''}`}
                onClick={onToggle}
            >
                <MemoryStick strokeWidth={1.5}/>
                <span className="settingTxt">Log memory</span>
            </div>

            <div className={`toggleSetting ${isOpen ? 'opened' : ''}`}>
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