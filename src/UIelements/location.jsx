import React, { useContext } from "react";

import { LocationContext} from "../UIelements/LocationProvider";
import { IP_LOCATIONS as locations } from "./ipCLass";


function PingLocation() {
  const { currentLoc, setCurrentLoc } = useContext(LocationContext)
  

  function scrollLeft() {
    if (currentLoc.locationId > 1) {
      const newLoc = locations[currentLoc.locationId - 2];
      setCurrentLoc(newLoc);
    }
  }

  function scrollRight() {
    if (currentLoc.locationId < locations.length) {
      const newLoc = locations[currentLoc.locationId];
      setCurrentLoc(newLoc);
    }
  }

  return (
    <div className="dropdown-wrapper">
      <span onClick={scrollLeft}>&lt;</span>
      <span>{currentLoc.location}</span>
      <span onClick={scrollRight}>&gt;</span>
    </div>
  );
}

export default PingLocation;