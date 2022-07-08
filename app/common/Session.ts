import Shell from './Shell';
import Instance from './Instance';
import Terminal, { Addon } from './Terminal';
import Settings from '../settings/Settings';
import { isMac } from '../Constants';

const { SHELL, ComSpec } = process.env;

const settings = new Settings();

class Session {
  terminal: Terminal | undefined;

  shell: Shell | undefined;

  create(): void {
    settings.update();

    const customArgs = settings.getValue('args');
    const customShell = settings.getValue('shell');
    const shellConfig = { file: isMac ? SHELL! : ComSpec!, args: customArgs };

    if (customShell) {
      shellConfig.file = customShell;
    }

    const instance = new Instance({
      tab: document.querySelector('.tabs-group')!,
      terminal: document.querySelector('.terminal-group')!,
    }).create(shellConfig.file);

    this.terminal = new Terminal(instance.terminal, settings);
    this.shell = new Shell(shellConfig.file, shellConfig.args, settings);

    this.terminal.launch(this.shell.shell);
    this.shell.launch(this.terminal.terminal);

    if (this.terminal) {
      this.terminal.loadAddon(Addon.fitAddon);
      this.terminal.loadAddon(Addon.webLinksAddon);
      this.terminal.loadAddon(Addon.ligaturesAddon);
      this.terminal.loadAddon(Addon.unicode11Addon);
      Addon.fitAddon.fit();
    }

    settings.watchOptions(this.terminal.terminal);
  }

  dispose(): void {
    if (this.terminal && this.shell) {
      this.terminal.dispose();
      this.shell.kill();
    }
  }
}

export default Session;
