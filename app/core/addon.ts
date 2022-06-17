import { shell } from 'electron';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { Unicode11Addon } from 'xterm-addon-unicode11';
import { LigaturesAddon } from 'xterm-addon-ligatures';

export const fitAddon = new FitAddon();

export const unicode11Addon = new Unicode11Addon();

export const ligaturesAddon = new LigaturesAddon();

export const webLinksAddon = new WebLinksAddon((event, uri) =>
  shell.openExternal(uri),
);

export default [fitAddon, unicode11Addon, webLinksAddon];
