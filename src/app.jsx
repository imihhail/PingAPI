import React, { useState, useEffect, createContext, useRef, useMemo } from "react";
import TitleBar from './UIelements/titlebar';
import SidePanel from "./UIelements/sidePanel";
import IpList from './ipList';
import { IpLocation } from './UIelements/ipCLass';


export const LocationContext = createContext()

export default function App() {
    const [sideBarOpened, setSideBarOpened] = useState(false)
    const [ipData, setIpData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isPinging, setIsPinging] = useState(false)
    const dataRef = useRef(null);

    console.log("app");
    
    useEffect(() => {
        (async function getData() {
            console.log("app useffect");
            dataRef.current          = await window.storeAPI.getAll()
            const storePingLocations = dataRef.current.Locations

            const pingLocations = Object.keys(storePingLocations).map((key, i) => ({ i, key }));
            const ipList        = Object.values(storePingLocations)[0] ?? [];

            setIpData({ pingLocations: pingLocations, ipList: ipList })
            setIsLoading(false)                
        })()
    }, []);
        
    const contextValue = useMemo(() => ({ ipData }), [ipData]);
    
    
    if (isLoading) return (
        <div className="page">
            <TitleBar setSideBarOpened={ setSideBarOpened }/>

            <div className="spinner-container">
                <div className="spinner" />
            </div>
        </div>
    );

    
    return (
        <LocationContext.Provider value={contextValue}>
            <div className='app'>
                <TitleBar setSideBarOpened={ setSideBarOpened /* setSideBarOpened, currentLoc */}/> 
                
                <div className='content'>
                    <SidePanel /* sideBarOpened, isPinging */
                        sideBarOpened = {sideBarOpened}
                        isPinging     = {isPinging}
                    />
                    <IpList
                        isPinging    = {isPinging}
                        setIsPinging = {setIsPinging}
                    />
                </div>
            </div>
        </LocationContext.Provider>
        )
    }