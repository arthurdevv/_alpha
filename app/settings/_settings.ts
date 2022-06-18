/* eslint-disable @typescript-eslint/no-unused-vars */
import chokidar from 'chokidar';
import { options } from '../constants';

const settings: SettingsRaw = {};

const watcher = chokidar.watch(process.cwd(), {
  atomic: true,
  persistent: true,
});
