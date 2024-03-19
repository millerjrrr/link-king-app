const ORANGE = "#f8ab54";
const RED = "#f37777";
const LIGHTRED = "#f377774d";
const GREEN = "#2ecc71";

const commonColors = { ORANGE, RED, LIGHTRED, GREEN };

const colors = {
  dark: {
    PRIMARY: "#1b1b1b",
    SECONDARY: "#000000",
    CONTRAST: ["#ffffff", "#ffeeba"],
    INACTIVE_CONTRAST: "#ffffff80",
    STATUSBAR: "light-content",
    ...commonColors,
  },
  blue: {
    PRIMARY: "#4169e1",
    SECONDARY: "#0000ff",
    CONTRAST: ["#ffffff", "#add8e6"],
    INACTIVE_CONTRAST: "#ffffff80",
    STATUSBAR: "light-content",
    ...commonColors,
  },
  turquoise: {
    PRIMARY: "#40e0d0",
    SECONDARY: "#00ced1",
    CONTRAST: ["#ffffff", "#afeeee"],
    INACTIVE_CONTRAST: "#ffffff80",
    STATUSBAR: "light-content",
    ...commonColors,
  },
  green: {
    PRIMARY: "#f5f5f5",
    SECONDARY: "#a3f58e",
    CONTRAST: ["#000000", "#80ffaa"],
    INACTIVE_CONTRAST: "#00000080",
    STATUSBAR: "dark-content",
    ...commonColors,
  },
  gold: {
    PRIMARY: "#f5f5f5",
    SECONDARY: "#f5d48e",
    CONTRAST: ["#000000", "#fff8dc"],
    INACTIVE_CONTRAST: "#00000080",
    STATUSBAR: "dark-content",
    ...commonColors,
  },
  pink: {
    PRIMARY: "#ff69b4",
    SECONDARY: "#ff1493",
    CONTRAST: ["#ffffff", "#ffe4e1"],
    INACTIVE_CONTRAST: "#ffffff80",
    STATUSBAR: "light-content",
    ...commonColors,
  },
  light: {
    PRIMARY: "#f5f5f5",
    SECONDARY: "#ffffff",
    CONTRAST: ["#362718", "#6b653d"],
    INACTIVE_CONTRAST: "#36271880",
    STATUSBAR: "dark-content",
    ...commonColors,
  },
};

export default colors;
