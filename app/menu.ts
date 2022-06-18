import { MenuItemConstructorOptions } from 'electron';
import { Menu, shell, dialog } from '@electron/remote';
import AppInfo from '../package.json';
import Settings from './settings/settings';
import { createSession } from './session';
import { appName, appNameUpper, appVersion, currentWindow } from './constants';

const settings = new Settings();

const { node } = process.versions;
const { electron } = AppInfo.devDependencies;

const MenuTemplate: MenuItemConstructorOptions[] = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New Terminal',
        accelerator: 'CommandOrControl+Shift+t',
        click: () => createSession(),
      },
      { type: 'separator' },
      {
        label: 'Settings',
        accelerator: 'CommandOrControl+,',
        click: () => settings.open(),
      },
      { type: 'separator' },
      {
        role: 'quit',
        label: 'Exit',
        accelerator: 'Alt+f4',
      },
    ],
  },
  {
    label: 'View',
    submenu: [
      {
        role: 'forceReload',
        label: 'Force Reload',
        accelerator: 'CommandOrControl+r',
      },
      {
        role: 'toggleDevTools',
        label: 'Developer Tools',
        accelerator: 'CommandOrControl+Shift+i',
      },
      { type: 'separator' },
      {
        role: 'resetZoom',
        label: 'Reset Zoom Level',
        accelerator: 'CommandOrControl+0',
      },
      {
        role: 'zoomIn',
        label: 'Zoom In',
        accelerator: 'CommandOrControl+=',
      },
      {
        role: 'zoomOut',
        label: 'Zoom Out',
        accelerator: 'CommandOrControl+-',
      },
    ],
  },
  {
    label: 'Window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'CommandOrControl+Shift+m',
        click: () => currentWindow.minimize(),
      },
      { type: 'separator' },
      {
        label: 'Toggle Always on Top',
        click: () => {
          const isAlwaysOnTop = currentWindow.isAlwaysOnTop();
          currentWindow.setAlwaysOnTop(!isAlwaysOnTop);
        },
      },
      {
        role: 'togglefullscreen',
        label: 'Toggle Full Screen',
        accelerator: 'f11',
      },
    ],
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'Report Issue',
        click: () => {
          const body = `<!-- Thank you for submitting an issue! -->

| OS      | OS Arch | Release |
| ------- | ------- | ------- |
| ${process.platform} | ${process.arch}   | ${appVersion} |

### Additional information

<!-- Any additional information that might be necessary to reproduce the issue. -->

### Describe the issue

<!-- Now describe the issue in detail. -->`;

          shell.openExternal(
            `https://github.com/arthurdevv/${appName}/issues/new?body=${encodeURIComponent(
              body,
            )}`,
          );
        },
      },
      { type: 'separator' },
      {
        label: `About ${appNameUpper}`,
        click: () =>
          dialog.showMessageBox(currentWindow, {
            title: `About ${appNameUpper}`,
            type: 'info',
            message: '',
            detail: `Version: ${appVersion}\nNode: ${node}\nElectron: ${electron}`,
          }),
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(MenuTemplate);
Menu.setApplicationMenu(menu);

export default menu;
