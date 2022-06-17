import * as xterm from 'xterm';
import SettingsClass from './settings/settings';

declare global {
  type Settings = Readonly<SettingsClass>;

  type SettingsContext = Record<string, any>;

  type SettingsType = string | number | boolean | object | null;

  type SettingsValue = SettingsType | SettingsObject | SettingsValue[];

  type SettingsObject = {
    [key: string]: SettingsValue;
  };

  type SettingsKeys =
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

  interface ShellOptions {
    name: string;

    cwd: string | undefined;

    env: {
      [key: string]: string;
    };
  }

  interface TerminalOptions {
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
  }

  interface TabInstance {
    container: HTMLElement;

    label: HTMLElement;

    close: HTMLElement;
  }

  interface TerminalInstance {
    container: HTMLElement;

    content: HTMLElement;
  }

  interface InstanceGroup {
    tab: Element;

    terminal: Element;
  }
}

export {};
