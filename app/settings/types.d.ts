import * as xterm from 'xterm';
import SettingsClass from './settings';

declare global {
  export type SettingsOptions = {
    path: string;

    defaultPath: string;
  };

  export type Settings = Readonly<SettingsClass>;

  export type SettingsContext = Record<string, any>;

  export type SettingsType = string | number | boolean | object | null;

  export type SettingsValue = SettingsType | SettingsObject | SettingsValue[];

  export type SettingsObject = {
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
