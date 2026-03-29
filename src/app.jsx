import React, { useState, useEffect, createContext, useRef } from "react";
import TitleBar from './UIelements/titlebar';
import SidePanel from "./UIelements/sidePanel";
import IpList from './ipList';
import { IpLocation } from './UIelements/ipCLass';


export const LocationContext = createContext()

export default function App() {
    const [sideBarOpened, setSideBarOpened] = useState(false)
    const [ipData, setIpData] = useState({});
    const [ipDatas, setIpDatas] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isPinging, setIsPinging] = useState(false)
    const dataRef = useRef(null);


    useEffect(() => {
        (async function getData() {
            dataRef.current          = await window.storeAPI.getAll()
            const storePingLocations = dataRef.current.Locations

            const pingLocations = Object.keys(storePingLocations).map((key, i) => ({ i, key }));
            const ipList        = Object.values(storePingLocations)[0] ?? [];

            setIpData({ pingLocations: pingLocations, ipList: ipList })
            setIsLoading(false)                
        })()
    }, []);

    function toggleSidePanel() {
        setSideBarOpened(prev => !prev)
    }    

    if (isLoading) return (
        <div className="page">
            <TitleBar toggleSidePanel={ toggleSidePanel }/>

            <div className="spinner-container">
                <div className="spinner" />
            </div>
        </div>
    );

    
    return (
        <LocationContext.Provider value={{ ipData }}>
            <div className='app'>
                <TitleBar toggleSidePanel={toggleSidePanel}/>
                
                <div className='content'>
                    <SidePanel
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