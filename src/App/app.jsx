import React, { useState, useEffect, createContext, useRef, useMemo } from "react";
import TitleBar from './titlebar';
import Layout from "./layout";


export const LocationContext = createContext()

export default function App() {
    const [ipData, setIpData] = useState({});
    const [currentLoc, setCurrentLoc] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const dataRef = useRef(null);

    console.log("app is rendering");
    
    useEffect(() => {
        (async function getData() {
            dataRef.current          = await window.storeAPI.getAll()
            const storePingLocations = dataRef.current.Locations

            const pingLocations = Object.keys(storePingLocations).map((key, i) => ({ i, key }));
            const ipList        = Object.values(storePingLocations)[0] ?? [];

            setCurrentLoc(pingLocations[0])
            setIpData({ pingLocations: pingLocations, ipList: ipList })
            setIsLoading(false)                
        })()
    }, []);
        
    const contextValue = useMemo(() => ({ ipData }), [ipData]);
    
    
    if (isLoading) return (
        <div className="app">
            <TitleBar/>

            <div className="spinner-container">
                <div className="spinner" />
            </div>
        </div>
    );

    
    return (
        <LocationContext.Provider value = { contextValue }>
            <Layout/>
        </LocationContext.Provider>
        )
    }