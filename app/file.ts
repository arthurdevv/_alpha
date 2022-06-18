import fs from 'fs';

export function readFile(path: string): string | undefined {
  try {
    return fs.readFileSync(path, 'utf8');
  } catch (error) {
    console.error(error);
  }
}

export function writeFile(path: string, data: string): void {
  try {
    fs.writeFileSync(path, data, { encoding: 'utf-8' });
  } catch (error) {
    console.log(error);
  }
}

export function existsFile(path: string): boolean | undefined {
  try {
    return fs.existsSync(path);
  } catch (error) {
    console.error(error);
  }
}
