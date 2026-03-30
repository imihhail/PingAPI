import React, { useContext } from "react";
import { LocationContext } from "../../../layout";


function PingLocation() {
  const { currentLoc, setCurrentLoc, ipData } = useContext(LocationContext)
  const locations = ipData.pingLocations

  

  
  async function scrollLeft() {
    if (currentLoc.i >= 1) {
      //await window.storeAPI.set(`Locations.${ipLocations.currentLoc.location}`, ipPartsList.map(({id, ip}) => ({ id, ip })));
      const newLoc = locations[currentLoc.i - 1];
      setCurrentLoc(newLoc);
    }
  }

  async function scrollRight() {
    if (currentLoc.i < locations.length - 1) {
      //await window.storeAPI.set(`Locations.${currentLoc.key}`, ipPartsList.map(({id, ip}) => ({ id, ip })));
      const newLoc = locations[currentLoc.i + 1];     
      setCurrentLoc(newLoc);
    }
  }

  return (
    <>
      <button data-testid="scrollLeft" className="ipBtn" onClick={scrollLeft}>◄</button>
      <input data-testid="sidebarLocation" className="ipNumber" value={currentLoc.key} disabled/>
      <button data-testid="scrollRight" className="ipBtn" onClick={scrollRight}>►</button>
    </>
  );
}

export default PingLocation;