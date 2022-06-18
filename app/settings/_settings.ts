import vm from 'vm';
import chokidar from 'chokidar';
import { shell } from 'electron';
import { options, watcherOptions } from '../constants';
import { readFile, writeFile, existsFile } from '../file';

let settings: SettingsRaw = {};

class Settings {
  setValue(key: SettingsKey, value: SettingsValue): void {
    if (!settings[key] || typeof value !== typeof settings[key]) return;

    settings[key] = value;
  }

  getValue(key: SettingsKey): SettingsValue {
    return settings[key];
  }

  getType(key: SettingsKey): SettingsValue {
    return typeof settings[key];
  }

  getContext(path: string): Record<string, any> {
    const code = readFile(path)!;
    const module: Record<string, any> = {};
    const script = new vm.Script(code, { displayErrors: false });

    script.runInNewContext({ module });

    return module.exports;
  }
}

const _settings = new Settings();

const watcher = chokidar.watch(options.parsedPath, watcherOptions);

function open() {
  shell.openPath(options.parsedPath);
}

function create() {
  if (existsFile(options.parsedPath)) {
    update();

    return;
  }

  const defaultFile = readFile(options.defaultPath)!;

  writeFile(options.parsedPath, defaultFile);

  update();
}

function update() {
  const context = _settings.getContext(options.parsedPath);

  if (!context) {
    return;
  }

  settings = context;
}

function updateOptions(terminal: Terminal) {
  watcher.on('change', () => {
    terminal.options = _settings.getContext(options.parsedPath);
  });
}

export default { Settings, open, create, update, updateOptions };
