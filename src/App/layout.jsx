import React, { useState, createContext, useMemo } from "react";
import TitleBar from './titlebar';
import Content from "./content/content";


export const LocationContext = createContext()

export default function Layout({ ipData } ) {
    const [sideBarOpened, setSideBarOpened] = useState(false)
    const [currentLoc, setCurrentLoc] = useState(ipData.currentLoc)
    
    const contextValue = useMemo(
        () => ({ currentLoc, setCurrentLoc, ipData }),
        [currentLoc, ipData]  
    )
    
    return (
        <LocationContext.Provider value={contextValue}>

            <div className='app'>
                <TitleBar setSideBarOpened = { setSideBarOpened }/> 
                <Content sideBarOpened     = { sideBarOpened }/>
            </div>

        </LocationContext.Provider>
    )
}