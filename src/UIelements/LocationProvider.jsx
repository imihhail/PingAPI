import React, { useState, useMemo, createContext,useEffect } from "react";


export const LocationContext = createContext()

export function LocationProvider({ children }) {
  const [currentLoc, setCurrentLoc] = useState(null);


  useEffect(() => {    
      (async function getData() {
        const data = await window.storeAPI.getStoreLocations();
        console.log("data: ", data);
        
        //setCurrentLoc(Object.keys(data)[0])
      })()
  }, []);

  const value = useMemo(() => ({ currentLoc, setCurrentLoc }), [currentLoc]);

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}