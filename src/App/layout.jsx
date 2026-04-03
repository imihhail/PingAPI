import React, { useState, createContext, useMemo } from "react";
import TitleBar from './titlebar';
import Content from "./content/content";


export const LocationContext = createContext()

export default function Layout({ ipData }) {
    const [sideBarOpened, setSideBarOpened] = useState(false)
    const [currentLoc, setCurrentLoc] = useState(ipData.pingLocations[ipData.settings.LocationId])
    const [settingsData, setSettingsData] = useState(ipData.settings) 
    
    
    const contextValue = useMemo (
        () => ({ currentLoc, setCurrentLoc, settingsData, setSettingsData }),
        [currentLoc, settingsData]  
    )

    
    return (
        <div className='app'>
            <TitleBar
                setSideBarOpened = { setSideBarOpened }
                currentLoc       = { currentLoc }
                settingsData     = { settingsData }
            />

            <LocationContext.Provider value = { contextValue }>

                <Content 
                    sideBarOpened = { sideBarOpened }
                    pingLocations = { ipData.pingLocations }
                    ipData        = { ipData.ipLists }
                />

            </LocationContext.Provider>
        </div>   
    )
}