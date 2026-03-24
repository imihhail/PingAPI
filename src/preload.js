// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';


contextBridge.exposeInMainWorld('winapi', {
  minimize: () => ipcRenderer.invoke('window-minimize'),
  close:    () => ipcRenderer.invoke('window-close'),
  resize:   (isOpened) => ipcRenderer.invoke('window-resize', isOpened),
});

contextBridge.exposeInMainWorld('startPig', {
  sendIP: (ip) => ipcRenderer.invoke('startPing', ip),
  onPing: (cb) => ipcRenderer.on('ping-data', (event, data) => cb(data)),
  stopPing: () => ipcRenderer.send('stopPing'),
  clearPingListeners: () => ipcRenderer.removeAllListeners('ping-data')
});

contextBridge.exposeInMainWorld('storeAPI', {
  get: (key) => ipcRenderer.invoke('store-get', key),
  set: (key, value) => ipcRenderer.invoke('store-set', { key, value }),
  has: (key) => ipcRenderer.invoke('store-has', key),
  delete: (key) => ipcRenderer.invoke('store-delete', key),
  getAll: () => ipcRenderer.invoke('store-get-all')

});