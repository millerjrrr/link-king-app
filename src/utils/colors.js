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
    PRIMARY: "#1b1b1b",
    SECONDARY: "#000000",
    CONTRAST: ["#ffffff", "#ffeeba"],
    INACTIVE_CONTRAST: "#ffffff80",
    STATUSBAR: "light-content",
    ...commonColors,
  },
  blue: {
    PRIMARY: "#254270",
    SECONDARY: "#51649c",
    CONTRAST: ["#c9fffe", "#ffeeba"],
    INACTIVE_CONTRAST: "#ffffff80",
    STATUSBAR: "light-content",
    ...commonColors,
  },
  green: {
    PRIMARY: "#b2dbb2",
    SECONDARY: "#c8e6be",
    ...darkText,
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
