import * as pty from 'node-pty';
import { homedir } from 'os';
import { Terminal } from 'xterm';
import { clipboard } from 'electron';

class Shell {
  shell: pty.IPty | null;

  file: string;

  args: string | string[];

  options: ShellOptions;

  constructor(file: string, args: string | string[], settings: Settings) {
    this.file = file;
    this.args = args;
    this.options = {
      name: 'xterm-256color',
      cwd: homedir(),
      env: {
        ...Object(process.env),
        ...settings.getValue('env'),
      },
    };

    this.shell = pty.spawn(this.file, this.args, this.options);
  }

  initialize(terminal?: Terminal | null): void {
    this.onData(terminal);
    this.onContext(terminal);
  }

  write(data: string): void {
    if (this.shell) {
      this.shell.write(data);
    }
  }

  onData(terminal?: Terminal | null): void {
    if (this.shell) {
      this.shell.onData(data => {
        if (terminal) {
          terminal.write(data);
        } else {
          this.write(data);
        }
      });
    }
  }

  onContext(terminal?: Terminal | null): void {
    document.oncontextmenu = () => {
      if (terminal && terminal.hasSelection()) {
        clipboard.writeText(terminal.getSelection());
      } else if (this.shell) {
        this.shell.write(clipboard.readText());
      }
    };
  }

  kill(): void {
    if (this.shell) {
      this.shell.kill();
    }
  }
}

export default Shell;
