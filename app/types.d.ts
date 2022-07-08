import * as xterm from 'xterm';
import _Settings from './settings/Settings';

declare global {
  type Terminal = xterm.Terminal | null;

  type TabInstance = {
    container: HTMLElement;

    label: HTMLElement;

    close: HTMLElement;
  };

  type TerminalInstance = {
    container: HTMLElement;

    content: HTMLElement;
  };

  type InstanceGroup = {
    tab: Element;

    terminal: Element;
  };

  type ShellOptions = {
    name: string;

    cwd: string | undefined;

    env: {
      [key: string]: string;
    };
  };

  type TerminalOptions = {
    fontSize?: number;

    fontFamily?: string;

    fontWeight?: xterm.FontWeight;

    lineHeight?: number;

    letterSpacing?: number;

    cursorBlink?: boolean;

    cursorStyle?: 'block' | 'underline' | 'bar';

    allowTransparency?: boolean;

    theme?: {
      cursor?: string;

      selection?: string;

      foreground?: string;

      background?: string;

      black?: string;

      red?: string;

      green?: string;

      yellow?: string;

      blue?: string;

      magenta?: string;

      cyan?: string;

      white?: string;

      brightBlack?: string;

      brightRed?: string;

      brightGreen?: string;

      brightYellow?: string;

      brightBlue?: string;

      brightMagenta?: string;

      brightCyan?: string;

      brightWhite?: string;
    };
  };

  type Settings = _Settings;

  type SettingsValue = string | number | boolean | object | null;

  type SettingsKey =
    | 'shell'
    | 'args'
    | 'env'
    | 'fontSize'
    | 'fontFamily'
    | 'fontWeight'
    | 'lineHeight'
    | 'letterSpacing'
    | 'cursorStyle'
    | 'cursorBlink'
    | 'allowTransparency'
    | 'theme';

  export type SettingsRaw = {
    name?: string;

    args?: string[];

    env?: {
      [key: string]: string;
    };

    fontSize?: number;

    fontFamily?: string;

    fontWeight?: xterm.FontWeight;

    lineHeight?: number;

    letterSpacing?: number;

    cursorBlink?: boolean;

    cursorStyle?: 'block' | 'underline' | 'bar';

    allowTransparency?: boolean;

    theme?: {
      cursor?: string;

      selection?: string;

      foreground?: string;

      background?: string;

      black?: string;

      red?: string;

      green?: string;

      yellow?: string;

      blue?: string;

      magenta?: string;

      cyan?: string;

      white?: string;

      brightBlack?: string;

      brightRed?: string;

      brightGreen?: string;

      brightYellow?: string;

      brightBlue?: string;

      brightMagenta?: string;

      brightCyan?: string;

      brightWhite?: string;
    };
  };
}

export {};
