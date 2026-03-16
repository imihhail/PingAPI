import React, { useContext } from "react";
import { LocationContext } from "../app";


function PingLocation() {
  const { currentLoc, setCurrentLoc, ipLocations, ipPartsList, setIpPartsList } = useContext(LocationContext)
  
  
  async function scrollLeft() {
    if (currentLoc.locationId >= 1) {
      await window.storeAPI.set(`Locations.${currentLoc.location}`, ipPartsList.map(({id, ip}) => ({ id, ip })));
      const newLoc = ipLocations[currentLoc.locationId - 1];
      setCurrentLoc(newLoc);
    }
  }

  async function scrollRight() {
    if (currentLoc.locationId < ipLocations.length - 1) {
      await window.storeAPI.set(`Locations.${currentLoc.location}`, ipPartsList.map(({id, ip}) => ({ id, ip })));
      const newLoc = ipLocations[currentLoc.locationId + 1];      
      setCurrentLoc(newLoc);
    }
  }

  return (
    <div className="dropdown-wrapper">
      <span className="ipLabel">Server location</span>
      {/* <button data-testid="scrollLeft" className="ipBtn" onClick={scrollLeft} >◄</button>
      <span data-testid="sidebarLocation">{currentLoc?.location}</span>
      <button data-testid="scrollRight" className="ipBtn" onClick={scrollRight}>►</button> */}
    </div>
  );
}

export default PingLocation;