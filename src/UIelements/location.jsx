import React, { useContext } from "react";
import { LocationContext } from "../app";


function PingLocation() {
  const { currentLoc, setCurrentLoc, ipLocations } = useContext(LocationContext)
  
  
  function scrollLeft() {
    if (currentLoc.locationId >= 1) {
      const newLoc = ipLocations[currentLoc.locationId - 1];
      setCurrentLoc(newLoc);
    }
  }

  function scrollRight() {
    if (currentLoc.locationId < ipLocations.length - 1) {
      const newLoc = ipLocations[currentLoc.locationId + 1];      
      setCurrentLoc(newLoc);
    }
  }

  return (
    <div className="dropdown-wrapper">
      <span onClick={scrollLeft}>&lt;</span>
      <span>{currentLoc?.location}</span>
      <span onClick={scrollRight}>&gt;</span>
    </div>
  );
}

export default PingLocation;