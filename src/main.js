import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { spawn } from 'child_process'
import Store from 'electron-store';

const store = new Store();
const os    = process.platform
const arg   = os == "darwin" ? "-c" : "-n"
const stdOS = os == "darwin" ? 1 : 0

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

let win
const createWindow = () => {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    win.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  win.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => app.quit());


ipcMain.handle('store-get', (_, key) => store.get(key));
ipcMain.handle('store-set', (_, { key, value }) => store.set(key, value));
ipcMain.handle('store-has', (_, key) => store.has(key));
ipcMain.handle('store-delete', (_, key) => store.delete(key));


ipcMain.handle('startPing', (e, ipListObj) => {
  let connectionFound = false
  let isRunning = true
  let pingStats = { id: null, log: null, speed: null, count: 0, avg: null, high: null, low: null, packetLoss: null }
  let totalPing = 0
  let totalErr  = 0
  let pingPromises = []

  ipcMain.once('stopPing', (e) => {
    isRunning = false
    e.sender.delete();
  });

  function startPing() {
    pingPromises = []
    
    ipListObj.forEach(ipList=> {
      pingPromises.push(pingQueue(ipList))
    });
  }

  function pingQueue(ipList) {
    return new Promise((resolve, reject) => {
      let ignoreFirstChunk = false
      
      const ping = spawn('ping', [[arg], '1', ipList.ip]);

      //ON STD OUTPUT
      ping.stdout.on('data', pingResp => {
        if (!ignoreFirstChunk && os != "darwin") {
          ignoreFirstChunk = true
          return
        }

        const [pingOutput, pingSpeed] = regexPing(stdOS, pingResp);

        connectionFound = true
        pingStats.id    = ipList.id,
        pingStats.log   = pingOutput
        pingStats.speed = Math.round(pingSpeed)
        totalPing       = totalPing + pingStats.speed
        pingStats.count++
        pingStats.avg   = Math.round(totalPing/pingStats.count)
        pingStats.packetLoss = Math.round((totalErr / (pingStats.count + totalErr))*100)

        resolve(pingStats)
        ping.kill()
      })

      //ON STD ERROR
      ping.stderr.on('data', pingResp => {
        const pingOutput = regexPing(0, pingResp);
        if (connectionFound) totalErr++
        
        resolve({ id: ipList.id, log: pingOutput })
        ping.kill()
      })
    })
  }

  (function loop() {
    if (isRunning) {
      startPing();
     
      Promise.all(pingPromises).then(res => {
          e.sender.send('ping-data', res);
          setTimeout(loop, 2000);
      })
    }
  })();
});

function regexPing(std, str) {
  const text       = str.toString();
  const pingOutput = text.split(/\r?\n/)[std];
  const speedArr   = pingOutput.match(/time(?:=|<)\s*([0-9]*\.?[0-9]+)/i);
  const pingSpeed  = speedArr ? parseFloat(speedArr[1]) : pingOutput

  return [pingOutput, pingSpeed]
}


// CLOSE AND MINIMIZE WINDOW
ipcMain.handle('window-minimize', () => win.minimize());
ipcMain.handle('window-close', () => {
  
  win.close()
});
