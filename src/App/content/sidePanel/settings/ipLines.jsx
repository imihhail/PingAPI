import React, { useContext, useState } from "react";
import { LocationContext } from "../../../layout";
import { PingAttributes } from "../../../ipCLass";
import { Server } from 'lucide-react';


function IpLines({ ipList, setIplists, isPinging }) {
    const { currentLoc } = useContext(LocationContext)
    const [displaySetting, setDisplaySetting] = useState(false)
    const locInd     = currentLoc.i
    const ipListLen  = ipList[locInd].length    

    function addIP() {
        if (ipList[locInd].length > 6 || isPinging) return 

        setIplists(prev => {
            const copy   = [...prev]
            copy[locInd] = [...copy[locInd],
                new PingAttributes(ipListLen, ["", "", "", ""])];
            return copy
        })
    }

    function removeIP() {
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
                <span className="settingTxt">IP count</span>
            </div>

            <div className={`toggleSetting ${displaySetting ? 'opened' : ''}`}>
                <button className="navBtn" onClick={removeIP}>◄</button>

                <input
                    className="settingOutput"
                    type="number"
                    value={ipListLen}
                    disabled
                />

                <button className="navBtn" onClick={addIP}>►</button>
            </div>
        </>
    );
}

export default IpLines;