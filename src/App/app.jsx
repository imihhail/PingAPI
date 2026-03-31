import React, { useState, useEffect, useRef, useMemo } from "react";
import TitleBar from './titlebar';
import Layout from "./layout";


export default function App() {
    const [ipData, setIpData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const dataRef = useRef(null);

    
    useEffect(() => {
        (async function getData() {
            dataRef.current          = await window.storeAPI.getAll()
            const storePingLocations = dataRef.current.Locations

            const pingLocations = Object.keys(storePingLocations).map((key, i) => ({ i, key }));
            const ipLists       = Object.values(storePingLocations) ?? [[]];
            const currentLoc    = pingLocations[0]
            
            setIpData({ pingLocations: pingLocations, currentLoc: currentLoc, ipLists: ipLists })
            setIsLoading(false)                
        })()
    }, []);        
    
    
    if (isLoading) return (
        <div className="app">
            <TitleBar/>

            <div className="spinner-container">
                <div className="spinner" />
            </div>
        </div>
    );

    
    return (
        <Layout ipData = { ipData }/>
    )
}