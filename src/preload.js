// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('winapi', {
  minimize: () => ipcRenderer.invoke('window-minimize'),
  close:    () => ipcRenderer.invoke('window-close'),
});

contextBridge.exposeInMainWorld('startPig', {
  // send an IP to main
  sendIP: (ip) => ipcRenderer.invoke('startPing', ip),

  // allow renderer to register a callback for ping output
  onPing: (cb) => {
    ipcRenderer.on('ping-data', (event, data) => cb(data));
  }
});