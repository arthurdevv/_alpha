const args = settings.getValue('args') as any;
const shellFile = settings.getValue('shell') as any;

let file = isMac ? process.env.SHELL! : process.env.ComSpec!;
file = !shellFile ? file : shellFile;

const createSession = () => {
  settings.update();

  const tabsGroup = document.querySelector('.tabs-group')!;
  const terminalGroup = document.querySelector('.terminal-group')!;

  const args = settings.getValue('args') as any;
  const shellFile = settings.getValue('shell') as any;

  let file = isMac ? process.env.SHELL! : process.env.ComSpec!;
  file = !shellFile ? file : shellFile;

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

  settings.watchOptions(terminal.terminal);
};
