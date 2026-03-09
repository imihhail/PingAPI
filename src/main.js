import { app, BrowserWindow, ipcMain, session } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { spawn } from 'child_process'
import Store from 'electron-store';
import { PingAttributes } from "./UIelements/ipCLass";
import readline from 'readline'
import installExtension from 'electron-devtools-installer';
import { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';


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
    width: 1350,
    height: 600,
    frame: false,
    
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,   // REQUIRED with contextBridge
      nodeIntegration: false,   // keep false for security
      enableRemoteModule: false // deprecated, keep disabled
    },
  });
win.webContents.openDevTools({ mode: "detach" });
  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    win.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async() => {
  if (!app.isPackaged) {
    try {
      await installExtension(REACT_DEVELOPER_TOOLS);
      console.log("React DevTools installed");
    } catch (err) {
      console.error(err);
    }
    createWindow()
  }

  

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      console.log("here");
      
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
  //win.setSize(1350, 900)
  const ipMap      = new Map()
  let pingPromises = []
  let isRunning    = true

  ipListObj.forEach((ip => ipMap.set(ip.id, new PingAttributes(ip.id, ip.ip)))) 
  
  //STOP PING
  ipcMain.once('stopPing', (e) => {  
    ipMap.clear()  
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
    let stdResponded  = false
    
    return new Promise((resolve, reject) => {
      const ping  = spawn('ping', [[arg], '1', ipList.ip]);

      ping.stdout.setEncoding('utf8')
      ping.stderr.setEncoding('utf8')

      const rl    = readline.createInterface({ input: ping.stdout });
      const rlErr = readline.createInterface({ input: ping.stderr });

      setTimeout(() => {
        if (!isRunning) {
          cleanUp()
        } else if (stdResponded){
          resolve(ipClass)
          cleanUp()
        } else {
          ipClass.calculatePingStats("Connection timed out.")
          resolve(ipClass)
          cleanUp()
        }
      }, 2000);

      //ON STD OUTPUT
      rl.on('line', (line) => {
        lineCount += 1

        if (lineCount === stdOS) {
          ipClass.calculatePingStats(line)
          stdResponded = true
        }
      })

      //ON STD ERROR
      rlErr.on('line', (line) => {
        stdResponded = true
        ipClass.calculatePingStats(line)
      })

      function cleanUp() {
        ping.kill('SIGTERM')
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
          //pingDelayArr = []
          e.sender.send('ping-data', res);
          loop()
      }).catch("Errpr from ping promises: ", e)
    }
  })();
});


// CLOSE AND MINIMIZE WINDOW
ipcMain.handle('window-minimize', () => win.minimize());
ipcMain.handle('window-close', ()    => win.close());