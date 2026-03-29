import React, { useContext } from "react";
import { LocationContext } from "../app";


function PingLocation() {
  const { ipData } = useContext(LocationContext)
  const currentLoc = ipData.pingLocations[0].key

  
  async function scrollLeft() {
    if (ipLocations.currentLoc.locationId >= 1) {
      await window.storeAPI.set(`Locations.${ipLocations.currentLoc.location}`, ipPartsList.map(({id, ip}) => ({ id, ip })));
      const newLoc = ipLocations.locations[ipLocations.currentLoc.locationId - 1];

      setIpLocations(prev => ({
          ...prev,
          currentLoc: newLoc
      }));
    }
  }

  async function scrollRight() {
    if (ipLocations.currentLoc.locationId < ipLocations.locations.length - 1) {
      await window.storeAPI.set(`Locations.${ipLocations.currentLoc.location}`, ipPartsList.map(({id, ip}) => ({ id, ip })));
      const newLoc = ipLocations.locations[ipLocations.currentLoc.locationId + 1];
           
      setIpLocations(prev => ({
          ...prev,
          currentLoc: newLoc
      }));
    }
  }

  return (
    <>
      <button data-testid="scrollLeft" className="ipBtn" onClick={scrollLeft}>◄</button>
      <input data-testid="sidebarLocation" className="ipNumber" value={currentLoc} disabled/>
      <button data-testid="scrollRight" className="ipBtn" onClick={scrollRight}>►</button>
    </>
  );
}

export default PingLocation;