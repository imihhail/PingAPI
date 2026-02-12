import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { process, spawn } from 'child_process'


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
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

const controllers = new Map()


ipcMain.handle('startPing', (e, ipListObj) => {
  const senderId = e.sender.id;

  let isRunning = true
let   pingPromises = []





  ipcMain.once('stopPing', () => {
    isRunning = false
    
  });

    
  

  function startPing() {
    console.log("pinging");
    
    pingPromises = []
    
    ipListObj.forEach(ipList=> {
      pingPromises.push(pingQueue(ipList))
    });
  }


  function pingQueue(ipList) {
    return new Promise((resolve, reject) => {
      const ping = spawn('ping', ['-n', '1', ipList.ip]);
    
      ping.stdout.on('data', pingResp => {
        const text     = pingResp.toString();
        const speedArr = text.match(/time(?:=|<)\s*([0-9]*\.?[0-9]+)/i);

        if (!speedArr) return null
        const latency = parseFloat(speedArr[1]);

        resolve({id: ipList.id, speed: latency})
        ping.kill()
      })
    })
  }

  (function loop() {
    if (isRunning) {
      startPing();
    } 
    

    Promise.all(pingPromises)
      .then(res => {
        e.sender.send('ping-data', res);
 
        setTimeout(loop, 2000);
      })
  })();
});

// CLOSE AND MINIMIZE WINDOW
ipcMain.handle('window-minimize', () => win.minimize());
ipcMain.handle('window-close', () => win.close());
