import React, { useContext } from "react";
import { LocationContext } from "../../../layout";
import { CloudDownload } from 'lucide-react';

function DownloadSize({ isPinging, isOpen, onToggle }) {
    const { settingsData, setSettingsData } = useContext(LocationContext)


    function decrease() {
        if (settingsData.DownloadSize < 10 || isPinging) return 
        setSettingsData(prev => ({ ...prev, DownloadSize: prev.DownloadSize - 5 }))  
    }

    function increase() {
        if (settingsData.DownloadSize > 95 || isPinging) return 
        setSettingsData(prev => ({ ...prev, DownloadSize: prev.DownloadSize + 5 }))                        
    }
    

    return (
        <>
            <div
                className={`settingBtn ${isOpen ? 'opened' : ''}`}
                onClick={onToggle}
            >
                <CloudDownload strokeWidth={1.5}/>
                <span className="settingTxt">Download size</span>
            </div>

            <div className={`toggleSetting ${isOpen ? 'opened' : ''}`}>
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