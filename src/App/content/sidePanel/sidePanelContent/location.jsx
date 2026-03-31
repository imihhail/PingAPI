import React, { useContext } from "react";
import { LocationContext } from "../../../layout";


function PingLocation({ pingLocations }) {
  const { currentLoc, setCurrentLoc } = useContext(LocationContext)


  async function scrollLeft() {
    if (currentLoc.i >= 1) {
      const newLoc = pingLocations[currentLoc.i - 1];
      setCurrentLoc(newLoc);
    }
  }

  async function scrollRight() {
    if (currentLoc.i < pingLocations.length - 1) {
      const newLoc = pingLocations[currentLoc.i + 1];     
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