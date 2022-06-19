import path from 'path';
import { _electron } from 'playwright';

const getPackagePath = (_path: string) => path.join(__dirname, _path);

test('electron launch', async () => {
  let executablePath: string;

  switch (process.platform) {
    case 'win32':
      executablePath = getPackagePath('../release/win-unpacked/Alpha.exe');
      break;
    case 'linux':
      executablePath = getPackagePath('../release/linux-unpacked/alpha');
      break;
    default:
      throw new Error('');
  }

  const app = await _electron.launch({ executablePath });

  await app.firstWindow();
});
