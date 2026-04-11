  if (!navigator.geolocation) {
      console.log('Geolocation not supported in this browser');
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude, accuracy } = pos.coords;
      console.log(`Latitude: ${latitude}\nLongitude: ${longitude}\nAccuracy (m): ${accuracy}`);
      console.log(latLonToTile(latitude, longitude, 35));
      
      
    },
    (err) => {

      console.log(`Error: ${err.message} (code ${err.code})`);
      
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );

  // lat, lon (deg), zoom (integer) -> tile x,y and pixel x,y
function latLonToTile(latDeg, lonDeg, zoom) {

  const lat = latDeg * Math.PI / 180;
  const n = 2 ** zoom;
  const xtile = Math.floor((lonDeg + 180) / 360 * n);
  const ytile = Math.floor((1 - Math.log(Math.tan(lat) + 1 / Math.cos(lat)) / Math.PI) / 2 * n);
  return { xtile, ytile };
}

// MAIN

    session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    if (permission === 'geolocation') {
      console.log("true");
      
      callback(true); // allow
    } else {
      console.log("false");
      
      callback(false);
    }
  });