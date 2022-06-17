import { bind } from 'mousetrap';
import { getCurrentWindow } from '@electron/remote';
import { createSession } from './session';
import Settings from './settings/settings';

const settings = new Settings();

const { openDevTools } = getCurrentWindow().webContents;

bind('ctrl+shift+t', () => createSession());

bind('ctrl+,', () => settings.open());

bind('ctrl+shift+i', () => openDevTools({ mode: 'undocked', activate: false }));
