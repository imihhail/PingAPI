import React, { useState, createContext, useMemo } from "react";
import TitleBar from './titlebar';
import Content from "./content/content";


export const LocationContext = createContext()

export default function Layout({ ipData }) {
    const [sideBarOpened, setSideBarOpened] = useState(false)
    const [currentLoc, setCurrentLoc] = useState(ipData.currentLoc)
    const [settingsData, setSettingsData] = useState(ipData.settings) 
    
    console.log("layout rendering", settingsData);
    
    const contextValue = useMemo (
        () => ({ currentLoc, setCurrentLoc,  }),
        [currentLoc]  
    )
    
    return (
        <div className='app'>
            <TitleBar
                setSideBarOpened = { setSideBarOpened }
                currentLoc       = { currentLoc.key }
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