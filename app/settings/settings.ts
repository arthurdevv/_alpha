import vm from 'vm';
import fs from 'fs';
import chokidar from 'chokidar';
import { shell } from 'electron';
import { settingsOptions, watcherOptions } from '../constants';

const watcher = chokidar.watch(settingsOptions.parsedPath, watcherOptions);

class Settings {
  settings: SettingsRaw;

  constructor() {
    this.settings = {};

    this.create();
  }

  open() {
    shell.openPath(settingsOptions.parsedPath);
  }

  create() {
    if (fs.existsSync(settingsOptions.parsedPath)) {
      this.update();

      return;
    }

    const defaultFile = fs.readFileSync(settingsOptions.defaultPath, 'utf8')!;

    fs.writeFileSync(settingsOptions.parsedPath, defaultFile, 'utf8');

    this.update();
  }

  update() {
    const context = this.getContext(settingsOptions.parsedPath);

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

      terminal.options = this.getContext(settingsOptions.parsedPath);
    };

    watcher.on('change', changeOptions);
  }

  setValue(key: SettingsKey, value: SettingsValue): void {
    if (!this.settings[key] || typeof value !== typeof this.settings[key]) {
      return;
    }

    this.settings[key] = value;
  }

  getValue(key: SettingsKey): any {
    return this.settings[key];
  }

  getType(key: SettingsKey): SettingsValue {
    return typeof this.settings[key];
  }

  getContext(path: string): Record<string, any> {
    const code = fs.readFileSync(path, 'utf8')!;
    const module: Record<string, any> = {};
    const script = new vm.Script(code, { displayErrors: false });

    script.runInNewContext({ module });

    return module.exports;
  }
}

export default Settings;
