import React from 'react';
import { useState, useEffect, createContext } from "react";
import TitleBar from './UIelements/titlebar';
import SidePanel from "./UIelements/sidePanel";
import IpList from './ipList';
import { IpLocation } from './UIelements/ipCLass';


export const LocationContext = createContext()

export default function App() {
    const [sideBarOpened, setSideBarOpened] = useState(false)
    const [currentLoc, setCurrentLoc] = useState(null)
    const [ipLocations, setIpLocations] = useState([]);
    const [ipPartsList, setIpPartsList] = useState(null)
    const [ipLength, setIpLength] = useState(5)
    const [isPinging, setIsPinging] = useState(false)
    

    function toggleSidePanel() {
        setSideBarOpened(prev => !prev)
    }

    useEffect(() => {
        (async function getData() {
            const locationData = await window.storeAPI.get('Locations');

            const locations = Object.keys(locationData).map((key, index) => {
                return new IpLocation(index, key);
            });

            setIpLocations(locations);
            setCurrentLoc(locations[0])
        })()
    }, []);

    
    return (
        <LocationContext.Provider value={{ currentLoc, setCurrentLoc, ipLocations, ipPartsList, setIpPartsList }}>
            {currentLoc &&
                <div className='page'>
                    <TitleBar toggleSidePanel={toggleSidePanel}/>
                    
                    <div className="content">
                        <SidePanel
                            sideBarOpened = {sideBarOpened}
                            ipLength      = {ipLength}
                            setIpLength   = {setIpLength}
                            isPinging     = {isPinging}
                        />
                        <IpList
                            ipLength     = {ipLength}
                            setIpLength  = {setIpLength}
                            isPinging    = {isPinging}
                            setIsPinging = {setIsPinging}
                        />
                    </div>
                </div>
            }
         </LocationContext.Provider>
        )
    }