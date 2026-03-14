import React from 'react';
import { useState, useEffect } from "react";
import TitleBar from './UIelements/titlebar';
import SidePanel from "./UIelements/sidePanel";
import IpList from './ipList';
import { LocationProvider } from "./UIelements/LocationProvider";


export default function App() {
    const [sideBarOpened, setSideBarOpened] = useState(false)

    function toggleSidePanel() {
        setSideBarOpened(prev => !prev)
    }


    return (
        <div>
            <LocationProvider>
                <TitleBar toggleSidePanel={toggleSidePanel}/>
            <div className="content">
                    <SidePanel sideBarOpened={sideBarOpened}/>
                    <IpList/>
            </div>
            </LocationProvider>
        </div>
        );
    }