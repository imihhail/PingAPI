import { useState, useContext, createContext } from "react";
import React from 'react';
import { LocationContext } from "../UIelements/LocationProvider";

function PingLocation() {
  const { currentLoc, setCurrentLoc } = useContext(LocationContext)
  const locations  = [{id: 1, location: "Location I"},
                      {id: 2, location: "Location II"}, 
                      {id: 3, location: "Location III"}];
  

  function scrollLeft() {
    if (currentLoc.id > 1) {
      const newLoc = locations[currentLoc.id - 2];
      setCurrentLoc(newLoc);
    }
  }

  function scrollRight() {
    if (currentLoc.id < locations.length) {
      const newLoc = locations[currentLoc.id];
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