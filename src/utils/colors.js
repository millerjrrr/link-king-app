const commonColors = {
  ORANGE: "#f8ab54",
  RED: "#f37777",
  LIGHTRED: "#f377774d",
  GREEN: "#2ecc71",
};

const darkText = {
  CONTRAST: ["#362718", "#8a793e"],
  INACTIVE_CONTRAST: "#36271880",
  STATUSBAR: "dark-content",
};

const colors = {
  dark: {
    PRIMARY: "#000000",
    SECONDARY: "#1b1b1b",
    CONTRAST: ["#ffffff", "#ffeeba"],
    INACTIVE_CONTRAST: "#ffffff80",
    STATUSBAR: "light-content",
    ...commonColors,
  },
  blue: {
    PRIMARY: "#03080f",
    SECONDARY: "#0A1931",
    CONTRAST: ["#FFFFE0", "#ffeeba"],
    INACTIVE_CONTRAST: "#ffffff80",
    STATUSBAR: "light-content",
    ...commonColors,
  },
  green: {
    PRIMARY: "#030f04",
    SECONDARY: "#0a3114",
    CONTRAST: ["#3dfc4d", "#ffeeba"],
    INACTIVE_CONTRAST: "#0a3114",
    ...commonColors,
  },
  orange: {
    PRIMARY: "#fff8e3",
    SECONDARY: "#ffe9ba",
    ...darkText,
    ...commonColors,
  },
  pink: {
    PRIMARY: "#ffe3f4",
    SECONDARY: "#ffd9f0",
    ...darkText,
    ...commonColors,
  },
  light: {
    PRIMARY: "#f5f5f5",
    SECONDARY: "#ffffff",
    ...darkText,
    ...commonColors,
  },
};

export default colors;
