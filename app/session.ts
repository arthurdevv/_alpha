import Shell from './core/shell';
import Instance from './core/instance';
import Terminal from './core/terminal';
import Settings from './settings/settings';
import Addons, { fitAddon } from './core/addon';
import 'xterm/css/xterm.css';
import './settings/_settings';

const settings = new Settings();
settings.create();

const createSession = () => {
  settings.update();

  const tabsGroup = document.querySelector('.tabs-group')!;
  const terminalGroup = document.querySelector('.terminal-group')!;

  const args = settings.getValue('args');
  const isWin = process.platform === 'win32';
  const isShellEmpty = settings.getValue('shell') === '';

  let file = isWin ? process.env.ComSpec! : process.env.SHELL!;
  file = isShellEmpty ? file : settings.getValue('shell');

  const instance = new Instance({
    tab: tabsGroup,
    terminal: terminalGroup,
  }).create(file).terminal;

  const terminal = new Terminal(instance, settings);
  const shell = new Shell(file, args, settings);

  terminal.initialize(shell.shell);
  shell.initialize(terminal.terminal);

  Addons.forEach(addon => terminal.loadAddon(addon));
  fitAddon.fit();

  settings.watchAndUpdateOptions(terminal.terminal);
};

export { createSession };
