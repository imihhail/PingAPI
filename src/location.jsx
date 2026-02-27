import { useState } from "react";
import React from 'react';

function PingLocation() {
  const [value, setValue] = useState("");

  return (
    <div className="dropdown-wrapper">
        <select
            className="dropdown"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        >
            <option value="" disabled>Select location</option>
            <option value="Loc1">Location 1</option>
            <option value="Loc2">Location 2</option>
            <option value="Loc3">Location 3</option>
        </select>
    </div>
  );
}

export default PingLocation;