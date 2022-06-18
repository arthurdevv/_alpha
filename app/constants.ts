import os from 'os';
import path from 'path';
import { app } from '@electron/remote';

export const isWin = process.platform === 'win32';

export const appPath = app.getAppPath();

export const userData = isWin ? app.getPath('userData') : os.homedir();

export const options: SettingsOptions = {
  path: path.join(userData, '.alpha.js'),
  defaultPath: path.resolve(appPath, 'app/settings/default.js'),
};
