import * as xterm from 'xterm';
import { IPty } from 'node-pty';
import { shell } from 'electron';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { Unicode11Addon } from 'xterm-addon-unicode11';
import { LigaturesAddon } from 'xterm-addon-ligatures';
import 'xterm/css/xterm.css';

const { openExternal } = shell;

export const Addon = {
  fitAddon: new FitAddon(),
  unicode11Addon: new Unicode11Addon(),
  ligaturesAddon: new LigaturesAddon(),
  webLinksAddon: new WebLinksAddon((e, uri) => openExternal(uri)),
};

class Terminal {
  terminal: xterm.Terminal | null;

  parent: HTMLElement;

  options: TerminalOptions;

  constructor(instance: HTMLElement, settings: Settings) {
    this.parent = instance;
    this.options = settings.settings;

    this.terminal = new xterm.Terminal(this.options);
    this.terminal.open(this.parent);
  }

  launch(shell?: IPty | null): void {
    this.onData(shell);
  }

  write(data: string): void {
    if (this.terminal) {
      this.terminal.write(data);
    }
  }

  focus(): void {
    if (this.terminal) {
      this.terminal.focus();
    }
  }

  clear(): void {
    if (this.terminal) {
      this.terminal.clear();
    }
  }

  selectAll(): void {
    if (this.terminal) {
      this.terminal.selectAll();
    }
  }

  getSelection(): string | void {
    if (this.terminal) {
      return this.terminal.getSelection();
    }
  }

  hasSelection(): boolean | void {
    if (this.terminal) {
      return this.terminal.hasSelection();
    }
  }

  loadAddon(addon: xterm.ITerminalAddon): void {
    if (this.terminal) {
      this.terminal.loadAddon(addon);
    }
  }

  onData(shell?: IPty | null): void {
    if (this.terminal) {
      this.terminal.onData(data => {
        if (shell) {
          shell.write(data);
        } else {
          this.write(data);
        }
      });
    }
  }

  dispose(): void {
    if (this.terminal) {
      this.terminal.dispose();
    }
  }
}

export default Terminal;
