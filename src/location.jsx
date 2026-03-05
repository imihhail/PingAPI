import { useState } from "react";
import React from 'react';

function PingLocation() {
  const locations = ["Location I", "Location II", "Location III"];
  const [currentLoc, setCurrentLoc] = useState(locations[0]);

  function scrollLeft() {
    
  }

  function scrollRight() {
    setCurrentLoc(locations[1])
  }

  return (
    <div className="dropdown-wrapper">
      <span onClick={scrollLeft}>&lt;</span>
      <span>{currentLoc}</span>
      <span onClick={scrollRight}>&gt;</span>
    </div>
  );
}

export default PingLocation;