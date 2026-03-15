import React, { useContext } from "react";
import { LocationContext } from "../app";


function PingLocation() {
  const { currentLoc, setCurrentLoc, ipLocations, ipPartsList, setIpPartsList } = useContext(LocationContext)
  
  
  async function scrollLeft() {
    if (currentLoc.locationId >= 1) {
      await window.storeAPI.set(`${currentLoc.location}`, ipPartsList.map(({id, ip}) => ({ id, ip })));
      const newLoc = ipLocations[currentLoc.locationId - 1];
      setCurrentLoc(newLoc);
    }
  }

  async function scrollRight() {
    if (currentLoc.locationId < ipLocations.length - 1) {
      await window.storeAPI.set(`${currentLoc.location}`, ipPartsList.map(({id, ip}) => ({ id, ip })));
      const newLoc = ipLocations[currentLoc.locationId + 1];      
      setCurrentLoc(newLoc);
    }
  }

  return (
    <div className="dropdown-wrapper">
      <span data-testid="scrollLeft" onClick={scrollLeft}>&lt;</span>
      <span data-testid="sidebarLocation">{currentLoc?.location}</span>
      <span data-testid="scrollRight" onClick={scrollRight}>&gt;</span>
    </div>
  );
}

export default PingLocation;