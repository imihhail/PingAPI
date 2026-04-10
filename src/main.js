import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { spawn } from 'child_process'
import Store from 'electron-store';
import { PingAttributes } from "./App/ipCLass";
import readline from 'readline'
import installExtension from 'electron-devtools-installer';
import { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { CreateStorageData } from './App/storageData';


const store = new Store();
const os    = process.platform
const arg   = os == "darwin" ? "-c" : "-n"
const stdOS = os == "darwin" ? 2 : 3
const ipConfigCmd = os == "darwin" ? ['getifaddr', 'en0'] : []


if (started) {
  app.quit();
}

let win

const createWindow = () => {
  win = new BrowserWindow({
    width: 1000,
    height: 475,
    frame: false,
    
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false, 
      enableRemoteModule: false 
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    win.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  //win.webContents.openDevTools();
};

app.whenReady().then(async() => {
  if (!app.isPackaged) {
    try {
      await installExtension(REACT_DEVELOPER_TOOLS);
    } catch (err) {
      console.error(err);
    } 
  }

  createWindow()

  if (!store.has("Locations")) {
    const data = CreateStorageData()
    store.set(data)    
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

//RECIEVE INPUT
ipcMain.handle('startPing', (e, ipListObj, settings) => {
  const ipMap   = new Map()
  let isRunning = true
  
  ipListObj.forEach((ip => ipMap.set(ip.id, new PingAttributes(ip.id, ip.ip, settings.LogMemory)))) 
  
  //STOP PING
  ipcMain.once('stopPing', (e) => {  
    ipMap.clear()  
    isRunning = false
    e.sender.delete();    
  });

  function getIpConfig() {
    return new Promise((resolve, reject) => {
      const ipConfig = spawn('ipconfig', ipConfigCmd);
      let output     = '';

      // ipConfig.on('close', (code) => {
      //   resolve("Not found")
      // })

      ipConfig.stdout.on('data', (data) => {
        output += data.toString();
      })

      ipConfig.on('close', () => {
        const match = output.match(/IPv4 Address.*:\s*([0-9.]+)/);
        resolve(match ? match[1] : "Not found");
      });

      ipConfig.on('error', reject);
    })
  }

  async function pingQueue(ipList, ipConfigResp) {
    const ipClass    = ipMap.get(ipList.id)
    let lineCount    = 0
    let stdResponded = false
 
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
          ipClass.calculatePingStats("Connection timed out.", ipConfigResp)
          resolve(ipClass)
          cleanUp()
        }
      }, settings.PingInterval);

      //ON STD OUTPUT
      rl.on('line', (line) => {
        lineCount += 1

        if (lineCount === stdOS) {
          ipClass.calculatePingStats(line, ipConfigResp)
          stdResponded = true
        }
      })

      //ON STD ERROR
      rlErr.on('line', (line) => {
        stdResponded = true
        ipClass.calculatePingStats(line, ipConfigResp)
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

  (async function loop() {
    while (isRunning) {
      console.log("pinging");
      
      const ipConfigResp = await getIpConfig();

      const pingPromises = ipListObj.map(ipList => {
        return pingQueue(ipList, ipConfigResp);
      });

      const res = await Promise.all(pingPromises);
      e.sender.send('ping-data', res);
    }
  })()
});


ipcMain.handle('store-get', (_, key) => store.get(key));
ipcMain.handle('store-set', (_, { key, value }) => store.set(key, value));
ipcMain.handle('store-has', (_, key) => store.has(key));
ipcMain.handle('store-delete', (_, key) => store.delete(key));
ipcMain.handle('store-get-all', () => {
  return { ...store.store };
});

ipcMain.handle('window-minimize', () => win.minimize());
ipcMain.handle('window-close',    () => win.close());
app.on('window-all-closed',       () => app.quit());
ipcMain.handle('window-resize',   (_, isOpened) => {
  const { width } = win.getBounds()
  isOpened ? win.setSize(width, 823) : win.setSize(width, 475)
})