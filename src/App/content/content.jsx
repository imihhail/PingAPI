import React, { useState } from "react";
import SidePanel from "./sidePanel/sidePanel"
import IpList from './ipContent/ipList'


export default function Content({ sideBarOpened, pingLocations }) {
    const [isPinging, setIsPinging] = useState(false)

    console.log("content is rendering");
    
    return (
        <div className="content">

            <div className={`sideBar ${sideBarOpened ? 'opened' : ''}`}>
                <SidePanel
                    isPinging     = { isPinging }
                />
            </div>

            <IpList
                isPinging     = { isPinging }
                setIsPinging  = { setIsPinging }
            />

        </div>
    )
}