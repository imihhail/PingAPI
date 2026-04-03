import React, { useContext, useState } from "react";
import { LocationContext } from "../../../layout";
import { PingAttributes } from "../../../ipCLass";
import { CircleGauge, CloudDownload, MapPinHouse, MapPinned } from 'lucide-react';


function PingInterval({ isPinging }) {
    const { settingsData, setSettingsData } = useContext(LocationContext)
    const [displaySetting, setDisplaySetting] = useState(false)
  

    function decrease() {
        if (settingsData.PingInterval < 750 || isPinging) return 

        setSettingsData(prev => ({
            ...prev,
            PingInterval: prev.PingInterval - 250
        }))  
    }

    function increase() {
        if (isPinging) return 
        
        setSettingsData(prev => ({
            ...prev,
            PingInterval: prev.PingInterval + 250
        }))                        
    }

    const toggleSetting = () => setDisplaySetting(prev => !prev)


    return (
        <>
            <div
                className={`settingBtn ${displaySetting ? 'opened' : ''}`}
                onClick={toggleSetting}
            >
                <CircleGauge strokeWidth={1.5}/>
                <span className="settingTxt">Ping interval</span>
            </div>

            <div className={`toggleSetting ${displaySetting ? 'opened' : ''}`}>
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