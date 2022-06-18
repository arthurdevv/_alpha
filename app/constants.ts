import os from 'os';
import path from 'path';
import chokidar from 'chokidar';
import { app, getCurrentWindow } from '@electron/remote';

export const isMac = process.platform === 'darwin';

export const appName = app.name;

export const appNameUpper = appName.charAt(0).toUpperCase() + appName.slice(1);

export const appVersion = app.getVersion();

export const appPath = app.getAppPath();

export const userData = isMac ? os.homedir() : app.getPath('userData');

export const currentWindow = getCurrentWindow();

export const options: SettingsOptions = {
  parsedPath: path.join(userData, '.alpha.js'),
  defaultPath: path.resolve(appPath, 'app/settings/default.js'),
};

export const watcherOptions: chokidar.WatchOptions = {
  atomic: true,
  persistent: true,
};
