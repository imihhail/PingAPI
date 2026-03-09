import React, { useState, useMemo, createContext } from "react";
import { IP_LOCATIONS as locations } from "./ipCLass";


export const LocationContext = createContext()

export function LocationProvider({ children }) {
  const [currentLoc, setCurrentLoc] = useState(locations[0]);

  const value = useMemo(() => ({ currentLoc, setCurrentLoc }), [currentLoc]);

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}