import vm from 'vm';
import os from 'os';
import fs from 'fs';
import path from 'path';
import { remote, shell } from 'electron';

const isWin = process.platform === 'win32';
const appPath = remote.app.getAppPath();
const userData = isWin ? remote.app.getPath('userData') : os.homedir();

const filename = '.alpha.js';
const filepath = path.join(userData, filename);
const defaultFilepath = path.resolve(appPath, 'app/settings', filename);

class Settings {
  settings: Record<string, any>;

  readonly filename = filename;

  readonly filepath = filepath;

  readonly defaultFilepath = defaultFilepath;

  constructor() {
    this.settings = {};
  }

  readFile(path: string): string {
    return fs.readFileSync(path, 'utf8');
  }

  writeFile(path: string, data: string): void {
    fs.writeFileSync(path, data, { encoding: 'utf8' });
  }

  setValue(key: SettingsKeys, value: SettingsValue): void {
    if (!this.settings[key] || typeof value !== typeof this.settings[key]) {
      return;
    }

    this.settings[key] = value;
  }

  getValue(key: SettingsKeys): any {
    return this.settings[key];
  }

  getType(key: SettingsKeys): SettingsType {
    return typeof this.settings[key];
  }

  getScript(path: string): vm.Script {
    return new vm.Script(this.readFile(path), { displayErrors: false });
  }

  getContext(path: string): Record<string, any> {
    const module: Record<string, any> = {};
    const script = this.getScript(path);

    script.runInNewContext({ module });

    return module.exports;
  }

  create(): void {
    if (fs.existsSync(this.filepath)) {
      this.update();
      return;
    }

    this.writeFile(this.filepath, this.readFile(this.defaultFilepath));
    this.update();
  }

  open(): void {
    shell.openPath(this.filepath);
  }

  update(): void {
    this.settings = this.getContext(this.filepath);
  }

  watchAndUpdateOptions(terminal): void {
    setInterval(() => {
      terminal.options = this.getContext(this.filepath);
    }, 1200);
  }
}

export default Settings;
