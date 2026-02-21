import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { spawn } from 'child_process'
import Store from 'electron-store';
import { PingAttributes } from "./ipCLass";
import readline from 'readline'

const store = new Store();
const os    = process.platform
const arg   = os == "darwin" ? "-c" : "-n"
const stdOS = os == "darwin" ? 2 : 3


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
  const ipMap         = new Map()
  let pingPromises    = []
  let connectionFound = false
  let isRunning       = true

  ipListObj.forEach((ip => ipMap.set(ip.id, new PingAttributes(ip.id, ip.ip))))  
  
  //STOP PING
  ipcMain.once('stopPing', (e) => {
    isRunning = false
    e.sender.delete();
  });

  //START PING
  function startPing() {
    console.log("pinging");
    
    pingPromises = []
    
    ipListObj.forEach(ipList=> {
      pingPromises.push(pingQueue(ipList))
    });
  }

  function pingQueue(ipList) {
    const ipClass = ipMap.get(ipList.id)
    let lineCount = 0
    
    return new Promise((resolve, reject) => {
      const ping  = spawn('ping', [[arg], '1', ipList.ip]);

      ping.stdout.setEncoding('utf8')
      ping.stderr.setEncoding('utf8')

      const rl    = readline.createInterface({ input: ping.stdout });
      const rlErr = readline.createInterface({ input: ping.stderr });

      //ON STD OUTPUT
      rl.on('line', (line) => {
        lineCount += 1

        if (lineCount === stdOS) {
          ipClass.calculatePingStats(line)
          resolve(ipClass);
          cleanUp()
        }
      })

      //ON STD ERROR
      rlErr.on('line', (line) => {
        ipClass.calculatePingStats(line)
        resolve(ipClass);
        cleanUp()
      })

      function cleanUp() {
        ping.kill()
        ping.removeAllListeners()
        rl.close()
        rl.removeAllListeners()
        rlErr.close()
        rlErr.removeAllListeners()
      }
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


// CLOSE AND MINIMIZE WINDOW
ipcMain.handle('window-minimize', () => win.minimize());
ipcMain.handle('window-close', ()    => win.close());