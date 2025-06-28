const { contextBridge, ipcRenderer } = require('electron')

ipcRenderer.invoke('saves-path').then(currentDir => {
    contextBridge.exposeInMainWorld('currentDir', currentDir)
})
contextBridge.exposeInMainWorld('electronAPI', {
    toggleFullscreen: () => ipcRenderer.send('toggle-fullscreen'),
    reloadWindow: () => ipcRenderer.send('reload-window'),
    closeWindow: () => ipcRenderer.send('close-window'),
    writeSave: (data) => ipcRenderer.send('write-save', data),
    loadSave: () => ipcRenderer.invoke('load-save'),
    getSavesPath: () => ipcRenderer.invoke('saves-path'),
    getAppVersion: () => ipcRenderer.invoke('app-version')
})