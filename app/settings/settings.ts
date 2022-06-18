import vm from 'vm';
import chokidar from 'chokidar';
import { shell } from 'electron';
import { options, watcherOptions } from '../constants';
import { readFile, writeFile, existsFile } from '../file';

const watcher = chokidar.watch(options.parsedPath, watcherOptions);

class Settings {
  settings: SettingsRaw;

  constructor() {
    this.settings = {};
  }

  open() {
    shell.openPath(options.parsedPath);
  }

  create() {
    if (existsFile(options.parsedPath)) {
      this.update();

      return;
    }

    const defaultFile = readFile(options.defaultPath)!;

    writeFile(options.parsedPath, defaultFile);

    this.update();
  }

  update() {
    const context = this.getContext(options.parsedPath);

    if (!context) {
      return;
    }

    this.settings = context;
  }

  watchOptions(terminal: Terminal) {
    const changeOptions = () => {
      if (!terminal) {
        return;
      }

      terminal.options = this.getContext(options.parsedPath);
    };

    watcher.on('change', changeOptions);
  }

  setValue(key: SettingsKey, value: SettingsValue): void {
    if (!this.settings[key] || typeof value !== typeof this.settings[key]) {
      return;
    }

    this.settings[key] = value;
  }

  getValue(key: SettingsKey): SettingsValue {
    return this.settings[key];
  }

  getType(key: SettingsKey): SettingsValue {
    return typeof this.settings[key];
  }

  getContext(path: string): Record<string, any> {
    const code = readFile(path)!;
    const module: Record<string, any> = {};
    const script = new vm.Script(code, { displayErrors: false });

    script.runInNewContext({ module });

    return module.exports;
  }
}

export default Settings;
