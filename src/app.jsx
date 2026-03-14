import React from 'react';
import { useState, useEffect, useContext, createContext } from "react";
import TitleBar from './UIelements/titlebar';
import SidePanel from "./UIelements/sidePanel";
import IpList from './ipList';
import { IpLocation } from './UIelements/ipCLass';


export const LocationContext = createContext()

export default function App() {
    const [sideBarOpened, setSideBarOpened] = useState(false)
    const [currentLoc, setCurrentLoc] = useState(null)
    const [ipLocations, setIpLocations] = useState([]);
    

    function toggleSidePanel() {
        setSideBarOpened(prev => !prev)
    }

      useEffect(() => {
          (async function getData() {
            const allData = await window.storeAPI.getAll();
            
            const locations = Object.keys(allData).map((key, index) => {
              return new IpLocation(index, key);
            });
    
            setIpLocations(locations);
            setCurrentLoc(locations[0])
          })()
      }, []);

    
    return (
        <div>
            <LocationContext.Provider value={{ currentLoc, setCurrentLoc, ipLocations }}>
                <TitleBar toggleSidePanel={toggleSidePanel}/>
                
                <div className="content">
                        <SidePanel sideBarOpened={sideBarOpened}/>
                        <IpList/>
                </div>
            </LocationContext.Provider>
        </div>
        );
    }