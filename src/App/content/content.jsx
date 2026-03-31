import React, { useState } from "react";
import SidePanel from "./sidePanel/sidePanel"
import IpList from './ipContent/ipList'


export default function Content({ sideBarOpened, pingLocations, ipData }) {
    const [isPinging, setIsPinging] = useState(false)
    const [ipLists, setIplists] = useState(ipData)

    console.log("content is rendering");
    
    return (
        <div className="content">

            <div className={`sideBar ${sideBarOpened ? 'opened' : ''}`}>
                <SidePanel
                    isPinging     = { isPinging }
                    setIplists    = { setIplists }
                    pingLocations = { pingLocations }
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