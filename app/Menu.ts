import { MenuItemConstructorOptions } from 'electron';
import { Menu, shell, dialog } from '@electron/remote';
import packageJSON from '../package.json';
import Session from './common/Session';
import Settings from './settings/Settings';
import { appName, appNameUpper, appVersion, currentWindow } from './Constants';

const session = new Session();
const settings = new Settings();

const { node } = process.versions;
const { electron } = packageJSON.devDependencies;

const MenuTemplate: MenuItemConstructorOptions[] = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New Terminal',
        accelerator: 'CommandOrControl+Shift+t',
        click: () => session.create(),
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
