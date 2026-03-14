import React, { useState, useMemo, createContext, useEffect } from "react";
import { IpLocation } from "./ipCLass";


export const LocationContext = createContext()

export function LocationProviders({ children }) {
  const [currentLoc, setCurrentLoc] = useState(null);
  const [ipLocations, setIpLocations] = useState([]);

console.log("locationprov:");

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

const value = useMemo(() => ({ currentLoc, setCurrentLoc, ipLocations }), [currentLoc]);

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}