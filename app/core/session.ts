import userShell from 'default-shell';
import Shell from './shell';
import Instance from './instance';
import Terminal from './terminal';
import Settings from '../settings/settings';
import Addons, { fitAddon } from './addon';

const settings = new Settings();
class Session {
  terminal: Terminal | undefined;

  shell: Shell | undefined;

  create(): void {
    settings.update();

    const customArgs = settings.getValue('args') as string | string[];
    const customShell = settings.getValue('shell') as string | undefined;
    const shellConfig = {
      file: customShell || userShell,
      args: customArgs,
    };

    const instance = new Instance({
      tab: document.querySelector('.tabs-group')!,
      terminal: document.querySelector('.terminal-group')!,
    }).create(shellConfig.file);

    this.terminal = new Terminal(instance.terminal, settings);
    this.shell = new Shell(shellConfig.file, shellConfig.args, settings);

    this.terminal.launch(this.shell.shell);
    this.shell.launch(this.terminal.terminal);

    Addons.forEach(addon => {
      if (this.terminal) {
        this.terminal.loadAddon(addon);
        fitAddon.fit();
      }
    });

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
