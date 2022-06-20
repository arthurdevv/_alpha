import Shell from './shell';
import Instance from './instance';
import Terminal from './terminal';
import Settings from '../settings/settings';
import Addons, { fitAddon } from './addon';
import { isMac } from '../constants';

const settings = new Settings();

class Session {
  terminal: Terminal | null;

  shell: Shell | null;

  constructor() {
    this.terminal = null;
    this.shell = null;
  }

  create(group: InstanceGroup): void {
    settings.update();

    const userArgs = settings.getValue('args') as string | string[];
    const userShell = settings.getValue('shell') as string | undefined;
    const defaultShell = isMac ? process.env.SHELL! : process.env.ComSpec!;
    const shellConfig = {
      file: userShell || defaultShell,
      args: userArgs,
    };

    const instance = new Instance({
      tab: group.tab,
      terminal: group.terminal,
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
