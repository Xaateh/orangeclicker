const { app, BrowserWindow, dialog, session } = require('electron');
const path = require('path');
const { autoUpdater } = require("electron-updater")


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
    icon: 'build/orange.ico'
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '/home/index.html'));

  // check for updates
  autoUpdater.checkForUpdatesAndNotify()

  // hide menu bar
  mainWindow.setMenuBarVisibility(false)

  // set default cookies
session.defaultSession.cookies.get({})
.then(cookies => {
  console.log(cookies)
});
const cookie = { url: 'https://github.com', name: 'dummy_name', value: 'dummy' }
session.defaultSession.cookies.set(cookie)
.then(() => {
  session.defaultSession.cookies.get({url: 'https://www.github.com'}, (error, cookies) => {
        console.log(error, cookies)
      })
}, (error) => {
  console.error(error)
})
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
  autoUpdater.quitAndInstall()
})