import React, { useState, useMemo, useContext } from "react";
import { LocationContext } from "../layout";
import SidePanel from "./sidePanel/sidePanel"
import IpList from './ipContent/ipList'


export default function Content({ sideBarOpened, pingLocations, ipData }) {
    const { currentLoc } = useContext(LocationContext)
    const [isPinging, setIsPinging] = useState(false)
    const [ipLists, setIplists] = useState(ipData)

    
    const ipList = useMemo (
        () => (ipLists),
        [ipLists[currentLoc.i].length]  
    )

    
    return (
        <div className="content">

            <div className={`sideBar ${sideBarOpened ? 'opened' : ''}`}>
                <SidePanel
                    isPinging     = { isPinging }
                    setIplists    = { setIplists }
                    pingLocations = { pingLocations }
                    ipList        = { ipList }
                />
            </div>

            <IpList
                isPinging    = { isPinging }
                setIsPinging = { setIsPinging }
                ipLists      = { ipLists }
                setIplists   = { setIplists }
            />

        </div>
    )
}