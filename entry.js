const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')
const yj = require('yieldable-json')

if (require('electron-squirrel-startup')) app.quit();

let currentReplayData = {};

let currentDir = app.getAppPath().replace(/app.asar$/, '');

//app.disableHardwareAcceleration()

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
process.env['ELECTRON_ENABLE_LOGGING'] = 'true';

function dirIsSub(name, parent) {
    return path.resolve(path.join(parent, name)).startsWith(path.join(parent, "/"));
}

function setMods(event, data) {
    fs.writeFile(path.join(currentDir, "saves/mods.json"), JSON.stringify(data), (e) => { if (e) return console.log(e); });
}

async function getMods(event) {
    let data = JSON.parse(fs.readFileSync(path.join(currentDir, "saves/mods.json")));
    return data;
}

function readdir(event, name = "") {
    if (!dirIsSub(name, currentDir))
        return "";
    return fs.readdirSync(path.join(currentDir, name));
}

async function resetReplay(event) {
    currentReplay = {};
    return;
}

async function addReplayData(event, key, data) {
    currentReplay[key] = data;
    return;
}

async function saveCurrentReplay(event, name = "") {
    return await saveReplay(event, name, currentReplay);
    
}

async function saveReplay(event, name, data) {
    if (!dirIsSub("replays/" + name, currentDir))
        return false;
    return await new Promise((resolve, reject) => {
        yj.stringifyAsync(data, (err, str) => {
            if (!err) {
                new Promise((resolveSmall, rejectSmall) => {
                    fs.writeFile(path.join(currentDir, "replays/" + name), str, (e) => {
                        if (e) {
                            console.error(e);
                            rejectSmall();
                        } else {
                            //console.log("The file should be saved now");
                            resolveSmall();
                        }
                    });
                }).then(out => {
                    resolve(true);
                }).catch(err => {
                    resolve(false);
                });
            } else {
                resolve(false);
            }
        })
    });
}

async function deleteReplay(event, name = "") {
    if (!dirIsSub("replays/" + name, currentDir))
        return false;
    let out = true;
    fs.unlink(path.join(currentDir, "replays/" + name), () => {//failure
        out = false;
    });
    fs.unlink(path.join(currentDir, "replays/" + name + "hlp"), () => {//failure
        console.error(".jsonhlp replay file \"" + name + "hlp\" does not exist!\n(.json file deleted: " + (out ? "successful" : "failure") + ")");
    });
    return out;
}

async function getReplay(event, name) {
    let data = JSON.parse(fs.readFileSync(path.join(currentDir, "replays/" + name)));
    return data;
}

function resourcesPath() {
    return currentDir;
}
function getAppVersion() {
    return app.getVersion();
}

function toggleMenuBar(event) {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents);
    win.setMenuBarVisibility(!win.isMenuBarVisible());
}

function toggleFullscreen(event) {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setFullScreen(!win.fullScreen);
}

function closeWindow(event) {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.close();
}

function reloadWindow(event) {
    const webContents = event.sender
    webContents.reloadIgnoringCache();
}

function writeSave(event, data) {
    fs.writeFile(path.join(currentDir, "saves/save.json"), JSON.stringify(data), (e) => { if (e) return console.log(e); });
}

async function loadSave(event) {
    let data = JSON.parse(fs.readFileSync(path.join(currentDir, "saves/save.json")));
    return data;
}

/*function saveFile(event, object) {
    nodeFs.writeFileSync(object.path, object.data);
}*/

const createWindow = () => {
    const win = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        autoHideMenuBar: false,//false for debugging (no need to change it anymore because F3 toggles the menu bar since version 0.4.4)
        width: 512,
        height: 480,//+ 18,
        minWidth: 256,
        minHeight: 240,
        show: false,
        icon: path.join(__dirname, "resources/sitelen/janBack.png"),
        title: "ma pi kon lon",
        resizable: true,//This should probably be false
        useContentSize: true,
        backgroundColor: "#000000",
        backgroundThrottling: false/*,
        fullscreen: true*/
    })

    win.once('ready-to-show', () => {
        //win.setAlwaysOnTop(true, "normal");
        //win.setFullScreen(false);
        win.show();
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    ipcMain.on('toggle-fullscreen', toggleFullscreen)
    ipcMain.on('close-window', closeWindow)
    ipcMain.on('write-save', writeSave)
    ipcMain.on('reload-window', reloadWindow)

    //two-way communication
    ipcMain.handle('saves-path', resourcesPath)
    ipcMain.handle('load-save', loadSave)
    ipcMain.handle('app-version', getAppVersion)

    createWindow()

    
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})