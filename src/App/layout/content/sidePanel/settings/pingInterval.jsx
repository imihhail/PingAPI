import React, { useContext } from "react";
import { LocationContext } from "../../../../layout/layout";
import { CircleGauge } from 'lucide-react';

function PingInterval({ isPinging, isOpen, onToggle }) {
    const { settingsData, setSettingsData } = useContext(LocationContext)

    
    function decrease() {
        if (settingsData.PingInterval < 750 || isPinging) return 
        setSettingsData(prev => ({ ...prev, PingInterval: prev.PingInterval - 250 }))  
    }

    function increase() {
        if (isPinging) return 
        setSettingsData(prev => ({ ...prev, PingInterval: prev.PingInterval + 250 }))                        
    }


    return (
        <>
            <div
                className={`settingBtn ${isOpen ? 'opened' : ''}`}
                onClick={onToggle}
            >
                <CircleGauge strokeWidth={1.5}/>
                <span className="settingTxt">Ping interval</span>
            </div>

            <div className={`toggleSetting ${isOpen ? 'opened' : ''}`}>
                <button className="navBtn" onClick={decrease}>◄</button>

                <input
                    className="settingOutput"
                    type="number"
                    value={settingsData.PingInterval}
                    disabled
                />

                <button className="navBtn" onClick={increase}>►</button>
            </div>
        </>
    );
}

export default PingInterval;