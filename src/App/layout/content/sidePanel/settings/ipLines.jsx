import React, { useContext } from "react";
import { LocationContext } from "../../../../layout/layout";
import { PingAttributes } from "../../ipContent/ipCLass";
import { Server } from 'lucide-react';

function IpLines({ ipList, setIplists, isPinging, isOpen, onToggle }) {
    const { currentLoc } = useContext(LocationContext)
    const locInd     = currentLoc.i
    const ipListLen  = ipList[locInd].length    
    

    function addIP() {
        if (ipList[locInd].length > 6 || isPinging) return 
        setIplists(prev => {
            const copy   = [...prev]
            copy[locInd] = [...copy[locInd], new PingAttributes(ipListLen, ["", "", "", ""])];
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


    return (
        <>
            <div
                className={`settingBtn ${isOpen ? 'opened' : ''}`}
                onClick={onToggle}
            >
                <Server strokeWidth={1.5}/>
                <span className="settingTxt">IP count</span>
            </div>

            <div className={`toggleSetting ${isOpen ? 'opened' : ''}`}>
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