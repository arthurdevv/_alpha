"use strict";

module.exports = {
  // The shell's file. If undefined, the default system shell will be used.
  shell: undefined,

  // The shell's arguments.
  args: ["--login"],

  // The shell's environment variables.
  env: {},

  // Controls the font size in pixels of the terminal.
  fontSize: 16,

  // Controls the font family of the terminal.
  fontFamily: "Menlo, 'DejaVu Sans Mono', Consolas, 'Lucida Console', monospace",

  // Controls the font weight of the terminal.
  fontWeight: 400,

  // Controls the line height of the terminal.
  lineHeight: 1,

  // Controls the letter spacing of the terminal.
  letterSpacing: 0,

  // Controls the style of terminal cursor. Accepts "block", "underline" and "bar".
  cursorStyle: "block",

  // Controls whether the terminal cursor blinks.
  cursorBlink: true,

  // Whether background should support non-opaque color.
  allowTransparency: true,

  // The color theme of the terminal.
  theme: {
    // The default cursor color of the terminal.
    cursor: "rgba(250, 250, 250, 1.0)",

    // The default selection color of the terminal.
    selection: "rgba(153, 153, 153, 1.0)",

    // The default foreground color of the terminal.
    foreground: "rgba(250, 250, 250, 1.0)",

    // The default background color of the terminal.
    background: "transparent",

    // Colors to theme the terminal with.
    black: "#000000",
    red: "#CD3131",
    green: "#00BB00",
    yellow: "#E5E510",
    blue: "#3A96DD",
    magenta: "#BC3FBC",
    cyan: "#11A8CD",
    white: "#E6E6E6",
    brightBlack: "#767676",
    brightRed: "#F14C4C",
    brightGreen: "#23D18B",
    brightYellow: "#F5F543",
    brightBlue: "#3B8EEA",
    brightMagenta: "#D670D6",
    brightCyan: "#29B8DB",
    brightWhite: "#E6E6E6",
  },
};