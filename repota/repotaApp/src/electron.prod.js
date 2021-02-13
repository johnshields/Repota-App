const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

// Reference https://pkief.medium.com/angular-desktop-apps-a9ce9e3574e8

let win;

const createWindow = () => {
    // Create the browser window
    win = new BrowserWindow({
        width: 1920,
        height: 1080,
        icon: path.join(__dirname, 'favicon.ico'),
    });

    // and load the index.html of the app
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Emitted when the window is closed.
    win.on('closed', () => {
        win = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows
app.on('ready', createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // dock icon is clicked and there are no other windows open
    if (win === null) {
        createWindow();
    }
});
