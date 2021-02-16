
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

// Reference https://pkief.medium.com/angular-desktop-apps-a9ce9e3574e8

let win;

const createWindow = () => {
    // set timeout to render the window not until the Angular
    // compiler is ready to show the project
    setTimeout(() => {
        // Create the browser window
        win = new BrowserWindow({
            width: 1920,
            height: 1080,
            icon: './src/favicon.ico'
        });

        // and load the app
        win.loadURL(url.format({
            pathname: '127.0.0.1:4200',
            protocol: 'http:',
            slashes: true
        }));

        win.webContents.openDevTools();

        // Emitted when the window is closed
        win.on('closed', () => {
            win = null;
        });
    }, 10000);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
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
