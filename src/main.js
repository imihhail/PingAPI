import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { spawn } from 'child_process'
import Store from 'electron-store';
import { PingAttributes } from "./ipCLass";

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

//RECIEVE INPUT
ipcMain.handle('startPing', (e, ipListObj) => {
  let warnId
  const ipMap = new Map();

  ipListObj.forEach((ip => {
    ipMap.set(ip.id, new PingAttributes(ip.id, ip.ip))
  }))  
  
  //let connectionFound = false
  let isRunning = true

  let pingPromises = []

  ipcMain.once('stopPing', (e) => {
    isRunning = false
    e.sender.delete();
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
      const start = performance.now?.() ?? Date.now();

      warnId = setTimeout(() => {
        const elapsed = Math.round((performance.now?.() ?? Date.now()) - start);
        console.warn(`Still running after ${elapsed}ms`);
      }, 6000);
      
      let ignoreFirstChunk = false
      
      const ping = spawn('ping', [[arg], '1', ipList.ip]);

      //ON STD OUTPUT
      ping.stdout.on('data', pingResp => {
        if (!ignoreFirstChunk && os != "darwin") {
          ignoreFirstChunk = true
          return
        }
        
        const ipClass = ipMap.get(ipList.id)

        ipClass.calculatePingStats(stdOS, pingResp)
        
        resolve(ipClass)
        ping.kill()
      })

      //ON STD ERROR
      ping.stderr.on('data', pingResp => {
        const pingOutput = regexPing(0, pingResp);
       // if (connectionFound) totalErr++
       console.log("FINALLY ERROR");
       
        
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
      }).finally(() =>{
        console.log(warnId);
        
      } );
    }
  })();
});


// CLOSE AND MINIMIZE WINDOW
ipcMain.handle('window-minimize', () => win.minimize());
ipcMain.handle('window-close', ()    => win.close());