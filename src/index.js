const { app, BrowserWindow, dialog, session } = require('electron');
const path = require('path');
const { autoUpdater } = require("electron-updater")
const { millify } = require("millify");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: 'build/orange.ico',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '/home/index.html'));

  // block ctrl+shift+i
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.key.toLowerCase() === 'i' && input.shift) {
      event.preventDefault()
    }
  })

  // load and millify orange count on page load
  mainWindow.webContents.on('did-frame-finish-load', (event) => {
    mainWindow.webContents
    .executeJavaScript('localStorage.getItem("oranges");', true)
    .then(result => {
      var oranges = millify(Number(result), {
        precision: 1,
        lowercase: true
      });
      mainWindow.webContents.executeJavaScript(`document.getElementById("orangeCounter").textContent="${oranges}"`)
    });
  })


  // move around screens with arrow keys or A/D
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.key.toLowerCase() === 'a' && input.type.toLowerCase() === 'keydown' || 
        input.key.toLowerCase() === 'arrowleft' && input.type.toLowerCase() === 'keydown') {
      const url = mainWindow.webContents.getURL().slice(-16);
      if (url.includes('home')) {
        mainWindow.loadFile(path.join(__dirname, '/stand/index.html'));
      } else if (url.includes('farm')) {
        mainWindow.loadFile(path.join(__dirname, '/home/index.html'));
      } else {
        return false
      }
    } else if ( input.key.toLowerCase() === 'd' && input.type.toLowerCase() === 'keydown' || 
                input.key.toLowerCase() === 'arrowright' && input.type.toLowerCase() === 'keydown') {
      const url = mainWindow.webContents.getURL().slice(-16);
      if (url.includes('home')) {
        mainWindow.loadFile(path.join(__dirname, '/farm/index.html'));
      } else if (url.includes('stand')) {
        mainWindow.loadFile(path.join(__dirname, '/home/index.html'));
      } else {
        return false
      }
    }
  })

  // check for updates
  autoUpdater.checkForUpdates()

  // hide menu bar
  // mainWindow.setMenuBarVisibility(false)
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// auto updater
autoUpdater.on("update-available", (_event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Ok'],
    title: 'Update Available',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'A new version is being downloaded. \nGame will restart shortly.'
  }
  dialog.showMessageBox(dialogOpts, (response) => {
  })
})
autoUpdater.on("update-downloaded", (_event) => {
  autoUpdater.quitAndInstall(true, true);
})