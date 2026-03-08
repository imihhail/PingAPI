import React, { useState, useMemo, useContext, createContext } from "react";


export const LocationContext = createContext()

export function LocationProvider({ children }) {
  const [currentLoc, setCurrentLoc] = useState({ id: 1, location: "Location I" });

  const value = useMemo(() => ({ currentLoc, setCurrentLoc }), [currentLoc]);

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}