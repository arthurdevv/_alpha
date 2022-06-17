import { app, BrowserWindow, nativeImage } from 'electron';
import { autoUpdater } from 'electron-updater';
import { initialize } from '@electron/remote/main';
import isDev from 'electron-is-dev';

initialize();

let mainWindow: BrowserWindow | null;

const winURL = isDev
  ? 'http://localhost:4000'
  : `file://${__dirname}/index.html`;

const createWindow = () => {
  const icon = nativeImage.createFromPath(
    `${__dirname}/../build/icons/256x256.png`,
  );

  if (app.dock) {
    app.dock.setIcon(icon);
  }

  mainWindow = new BrowserWindow({
    width: 1050,
    height: 560,
    minWidth: 400,
    minHeight: 300,
    title: 'Alpha',
    frame: false,
    transparent: process.platform === 'darwin',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', () => {
  createWindow();

  autoUpdater.checkForUpdatesAndNotify();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.allowRendererProcessReuse = false;
