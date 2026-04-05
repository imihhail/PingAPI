import React, { useContext, useState } from "react";
import { LocationContext } from "../../../layout";

import { CloudDownload } from 'lucide-react';


function DownloadSize({ isPinging }) {
    const { settingsData, setSettingsData } = useContext(LocationContext)
    const [displaySetting, setDisplaySetting] = useState(false)
  

    function decrease() {
        if (settingsData.DownloadSize < 10 || isPinging) return 

        setSettingsData(prev => ({
            ...prev,
            DownloadSize: prev.DownloadSize - 5
        }))  
    }

    function increase() {
        if (settingsData.DownloadSize > 95 || isPinging) return 
        
        setSettingsData(prev => ({
            ...prev,
            DownloadSize: prev.DownloadSize + 5
        }))                        
    }

    const toggleSetting = () => setDisplaySetting(prev => !prev)


    return (
        <>
            <div
                className={`settingBtn ${displaySetting ? 'opened' : ''}`}
                onClick={toggleSetting}
            >
                <CloudDownload strokeWidth={1.5}/>
                <span className="settingTxt">Download size</span>
            </div>

            <div className={`toggleSetting ${displaySetting ? 'opened' : ''}`}>
                <button className="navBtn" onClick={decrease}>◄</button>

                <input
                    className="settingOutput"
                    type="number"
                    value={settingsData.DownloadSize}
                    disabled
                />

                <button className="navBtn" onClick={increase}>►</button>
            </div>
        </>
    );
}

export default DownloadSize;