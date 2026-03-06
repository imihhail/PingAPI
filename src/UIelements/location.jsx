import { useState } from "react";
import React from 'react';

function PingLocation({ changeLoc }) {
  const locations = [{id: 1, location: "Location I"},
                     {id: 2, location: "Location II"}, 
                     {id: 3, location: "Location III"}];
  const [currentLoc, setCurrentLoc] = useState(locations[0]);

  function scrollLeft() {
    if (currentLoc.id > 1) {
      const newLoc = locations[currentLoc.id - 2];
      setCurrentLoc(newLoc);
      changeLoc(newLoc.location);
    }
  }

  function scrollRight() {
    if (currentLoc.id < locations.length) {
      const newLoc = locations[currentLoc.id];
      setCurrentLoc(newLoc);
      changeLoc(newLoc.location);
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