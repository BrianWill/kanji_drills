const { app, BrowserWindow, ipcMain, net } = require('electron');
const https = require('https');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        },
    });

    win.removeMenu();
    win.loadFile('index.html');
    return win;
}

app.allowRendererProcessReuse = false;

app.whenReady().then(() => {
    let win = createWindow();
    win.webContents.on('before-input-event', (event, input) => {
        if (input.control && input.shift && input.key.toLowerCase() === 'i') {
            console.log('Pressed Control+Shift+I');
            win.webContents.openDevTools();
            event.preventDefault()
        }
        if (input.control && input.key.toLowerCase() === 'r') {
            console.log('Pressed Control+R');
            win.webContents.reload();
        }
        if (input.control && input.shift && input.key.toLowerCase() === 'r') {
            console.log('Pressed Control+Shift+R');
            win.webContents.reloadIgnoringCache();
        }
    });
    console.log('loaded main');
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
});





