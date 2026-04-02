import React, { useContext, useState } from "react";
import { LocationContext } from "../../../layout";
import { PingAttributes } from "../../../ipCLass";
import { CircleGauge, CloudDownload, MapPinHouse, MapPinned } from 'lucide-react';


function ???({ ipList, setIplists, isPinging }) {
    const { currentLoc } = useContext(LocationContext)
    const [displaySetting, setDisplaySetting] = useState(false)
    const locInd     = currentLoc.i
    const ipListLen  = ipList[locInd].length    

    function ???() {
        if (ipList[locInd].length > 6 || isPinging) return 

        setIplists(prev => {
            const copy   = [...prev]
            copy[locInd] = [...copy[locInd],
                new PingAttributes(ipListLen, ["", "", "", ""])];
            return copy
        })
    }

    function ???() {
        if (ipList[locInd].length < 2 || isPinging) return 

        setIplists(prev => {
            const copy   = [...prev]
            copy[locInd] = copy[locInd].slice(0, -1)
            return copy
        })                
    }

    const toggleSetting = () => setDisplaySetting(prev => !prev)


    return (
        <>
            <div
                className={`settingBtn ${displaySetting ? 'opened' : ''}`}
                onClick={toggleSetting}
            >
                <Server strokeWidth={1.5}/>
                <span className="settingTxt">???</span>
            </div>

            <div className={`toggleSetting ${displaySetting ? 'opened' : ''}`}>
                <button className="navBtn" onClick={???}>◄</button>

                <input
                    className="settingOutput"
                    type="number"
                    value={???}
                    disabled
                />

                <button className="navBtn" onClick={???}>►</button>
            </div>
        </>
    );
}

export default ???;